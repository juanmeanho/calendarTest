const datepicker = new Vue({
    el: '#datepicker',
    components: {
        vuejsDatepicker
    },
    data: {
        date: null,
        numberDays: null,
        numberMonths: 0,
        headerMonth: [],
        daysPrint: [{ month: null, year:null, day:null, nominalDay:null }],
        months:
            ['January','February','March','April','May','June','July','August','September','October','November','December'],
    },
    methods: {

        renderCalendar(){

            this.headerMonth = [];
            this.daysPrint = [];
            this.numberMonths = [];

            var yearInit = this.date.getFullYear();
            var monthInit = this.date.getMonth()+1;
            var end_date = new Date(this.date);
            end_date.setDate(this.date.getDate() + eval(this.numberDays));

            this.numberMonths = moment(end_date).diff(moment(this.date),'months')+1; //numero de meses

            for(var k = 0, j = monthInit - 1; k < this.numberMonths; k++, j++){

                this.headerMonth.push(this.months[j]+'-'+yearInit);

                var dynamicDate = new Date(yearInit, j, 1)

                var month = dynamicDate.getMonth()+1;
                var year = dynamicDate.getFullYear();
                var now = new Date(year,month-1,1); //1er dia del mesactual seleccionado fecha larga
                var last = new Date(year,month,0); //ultimo dia delmes seleccionado fecha larga
                var firstDayWeek=dynamicDate.getDay(); //primer dia nominal del mes
                var firstDaySelectedName=this.date.getDay(); //primer dia nominal seleccionado
                var firstDaySelected=this.date.getDate(); //primer dia numerico seleccionado
                var lastDayMonth=last.getDate(); //ultimo dia del messeleccionado DD
                var lastCell=firstDayWeek+lastDayMonth; //total de celdas
                var dia=0;
                var nominal;

                for(var i = 0; i <= 41 ; i++) //numero maximo de celdas
                {
                    if(i == firstDayWeek) //captura el primer dia
                    {
                        dia = 1;
                        nominal = new Date(yearInit,(month-1),1)
                        if(k==0 && (this.headerMonth) == this.months[month-1]+'-'+yearInit && firstDaySelected != 1)
                            this.daysPrint.push({ month: this.months[month-1], year: yearInit, day: '', nominalDay:'' })
                        else
                            this.daysPrint.push({ month: this.months[month-1], year: yearInit, day: dia, nominalDay:nominal.getDay() })
                    }

                    if(i < firstDayWeek || i >= lastCell - 1){
                        if(i%7 == 6 && dia == lastDayMonth){
                            break; 
                        } //celda vacia
                        this.daysPrint.push({ month: this.months[month-1], year: yearInit, day: ''});
                    }
                    else{
                           if(k==0){ 
                                if(firstDaySelected > ++dia) //primeros dias invalidos
                                    this.daysPrint.push({ month: this.months[month-1], year: yearInit, day: ''})
                                else{
                                    nominal = new Date(yearInit,(month-1),dia)
                                    this.daysPrint.push({ month: this.months[month-1], year: yearInit, day: dia, nominalDay: nominal.getDay()})
                                }

                            }
                            else{
                                if(k==this.numberMonths-1 && dia > end_date.getDate()-1) //ultimos dias invalidos
                                    this.daysPrint.push({ month: this.months[month-1], year: yearInit, day: ''});
                                else{
                                    nominal = new Date(yearInit,(month-1),dia+1)
                                    this.daysPrint.push({ month: this.months[month-1], year: yearInit, day: ++dia, nominalDay:nominal.getDay()})
                                }
                            }   
                            
                        }       
                }

                if(this.months[j] == 'December'){
                        j = -1;
                        yearInit++;
                    }
            }

        },
        checkDays(day, nominal){

            if(day == '')
                return "invalid";
            else
                if(nominal == 0 || nominal == 6)
                    return "weekend"
                else
                    return "weekdays";
        
        }
    }
  });
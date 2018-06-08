const datepicker = new Vue({
    el: '#datepicker',
    components: {
        vuejsDatepicker
    },
    data: {
        date: null,
        numberDays: null,
        headerMonth: [],
        headerYear: [],
        daysPrint: [],
        months:
['January','February','March','April','May','June','July','August','September','October','November','December'],


    },
    methods: {

        renderCalendar(){

            this.headerMonth = [];
            this.daysPrint = [];



            var yearInit = this.date.getFullYear();
            var monthInit = this.date.getMonth()+1;
            fecha = new Date(this.date);
            var end_date = new Date();
            end_date.setDate(fecha.getDate() + eval(this.numberDays));
            //alert(end_date);

            numberMonths = moment(end_date).diff(moment(fecha),'months')+1; //numero de meses

            for(var k = 0, j = monthInit - 1; k < numberMonths; k++, j++){

                this.headerMonth.push(this.months[j]+'-'+yearInit);

                var dynamicDate = new Date(yearInit, j, 1)

                //alert(dynamicDate)
                ////////////////
                var month = dynamicDate.getMonth()+1;
                var year = dynamicDate.getFullYear();
                var now = new Date(year,month-1,1); //1er dia del mesactual seleccionado fecha larga
                var last = new Date(year,month,0); //ultimo dia delmes seleccionado fecha larga
                var firstDayWeek=dynamicDate.getDay(); //primer dia nominalseleccionado
                var lastDayName = new Date(last).getDay(); //Ultimodia del mes Nominal BORRAR
                var lastDayMonth=last.getDate(); //ultimo dia del messeleccionado DD
                var last_cell=firstDayWeek+lastDayMonth; //total de celdas
                var days = [];

                //this.headerMonth = this.allMonths[month-1];
                //this.headerYear = year;

                var dia=0;
//alert(now+'-'+last+'-'+firstDayWeek+'-'+lastDayMonth+'-'+last_cell)

                for(var i = 0; i <= 41 ; i++) //numero maximo de celdas
                {
                    if(i == firstDayWeek) //captura el primer dia
                    {
                        dia = 1;
                        this.daysPrint.push(dia+'-'+month);
                    }
                    if(i < firstDayWeek || i >= last_cell - 1){
                      //  alert(this.lastDayMonth);
                        if(i%7 == 6 && dia == lastDayMonth){
                            //break;
                        //this.daysPrint.push('-----');
                        break; } //celda vacia
                        this.daysPrint.push('x'); //celda vacia
                        }
                    else
                        this.daysPrint.push(++dia+'-'+month);

                }
                ////////////////

              

                if(this.months[j] == 'December'){
                        j = -1;
                        yearInit++;
                    }
            }
            //alert(month);

            function renderCalendar(date) {
                //alert(date)
                //var firstDay = date.getDate();
                //alert(firstDay)
               

                return days;

            }


        }
    }
  });
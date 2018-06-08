const datepicker = new Vue({
    el: '#datepicker',
    components: {
        vuejsDatepicker
    },
    data: {
        date: null,
        numberDays: null,
        fecha: null,
        fecha_fin: null,
        numberMonths: null,
        monthsPrint: [],
        monthInit: null,
        months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        yearInit: null,
        yearPrint: null,
        dayInit: null,
        dayPrint: []
       
    },
    methods: {
        

        sum(date, numberDays){

            if(this.monthsPrint != '')
                this.monthsPrint = [];

            this.fecha = new Date(date);
            this.fecha_fin = new Date();
            this.dayInit = this.fecha.getDate();
            this.monthInit = this.fecha.getMonth()+1;
            this.yearInit = this.fecha.getFullYear();
            this.yearPrint = this.fecha.getFullYear();
            this.fecha_fin.setDate(this.fecha.getDate() + eval(numberDays));
            
            console.log(
                "Fecha inicio: " +
                this.fecha.getDate() + "/" +
                (this.fecha.getMonth()+1) + "/" +
                this.fecha.getFullYear()
              );
            console.log(
                "<br>Fecha fin: " +
                this.fecha_fin.getDate() + "/" +
                (this.fecha_fin.getMonth()+1) + "/" +
                this.fecha_fin.getFullYear()
              );

              this.numberMonths = moment(this.fecha_fin).diff(moment(this.fecha), 'months');
              

              for(i = 0, j = this.monthInit - 1; i < this.numberMonths + 1; i++, j++){
                this.monthsPrint.push(this.months[j] +'-'+ this.yearPrint)
                if(i < 11)
                    this.yearPrint = this.yearInit;
                if(this.months[j] == 'December'){
                        j = -1;
                        this.yearPrint++;
                    }
            }

            for(k = this.dayInit ; k < this.numberDays; k++){
                this.dayPrint.push(this.dayInit)
            }
        }
    }
  });
  
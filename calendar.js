let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let yearNum = document.getElementById('yearNum');

function renderMonths(){
    allMonths.forEach(function(month, i){
        let months = document.querySelector('.months')
        let monthSpan = document.createElement('span')

        monthSpan.className = 'each-month'
        monthSpan.id = i+1
        monthSpan.innerHTML = `${month}`
        months.append(monthSpan)

        monthSpan.addEventListener('click', function(e){
            if(document.querySelector('.hidden-p')){
                let sel = document.querySelector('.selected')
                sel.className = 'each-month'
            }
        })
    })
}
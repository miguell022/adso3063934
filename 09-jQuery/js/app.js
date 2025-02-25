$(function () {

    // check localStorage
    if (localStorage.getItem('todolist') != null) {
        $('.list').html(localStorage.getItem('todolist'))
        countTasks()
        countRemains()
    } else {
        // count task & Remains
        countTasks()
        countRemains()
    }

    $('footer').on('click', '#add', function () {
        if ($('#input-task').val().length > 0) {

            $task = '<article> \
                <input type="checkbox" > \
                <p>'+ $('#input-task').val() + '</p> \
                <button>&times;</button> \
            </article>'
            $('section.list').append($task)
            $('input-task').val('')
            countTasks()
            countRemains()


        } else {
            alert('Please Enter a Task')
        }

    })
    //Toggle Task(Remain/Done)
    $('body').on('click', 'input[type=checkbox]', function () {
        //if checked
        if ($(this).prop('checked')) {
            $(this).attr('checked', true)
            $(this).parent().addClass('checked')
        } else {
            $(this).attr('checked', false)
            $(this).parent().removeClass('checked')
        }
        countRemains()
    })
    //remove task
    $('body').on('click', 'article button', function () {
        $(this).closest('article').remove()
    })
})

function countTasks() {
    $('.num-task').text($('article').length)
    $('.title-task').text($('article').length > 1 ? 'tasks' : 'task')
}
//count remains
function countRemains() {
    $remain = Math.abs($('.checked').length - $('article').length)
    $('.num-remains').text($remain)
    $('.title-remains').text($remain > 1 ? 'Remains' : 'Remain')

    //set localStorage

    localStorage.setItem('todolist', $('.list').html())

}
function eliminar () {
    $('.list').html('')
    localStorage.removeItem('todolist')
    countTasks()
    countRemains()
}
$('body').on('click','#eliminar',function(){
    eliminar()
})
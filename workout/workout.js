class workout_record{
    constructor(date, goal, exercise_array){
        this.data = date;
        this.goal = goal;
        this.exercise_array = exercise_array;
    }
}
class exercise{
    constructor(exercise_name, set, reps, weight, weight_unit, rest, self_evaluation){
        this.exercise_name = exercise_name;
        this.set = String(set);
        this.reps = String(reps);
        this.weight = String(weight);
        this.weight_unit = weight_unit
        this.rest = String(rest);
        this.self_evaluation = String(self_evaluation);
    }
}

function set_date_to_today(){
    var date_selector = document.getElementById("date_selector");
    var date = new Date();
    var date_string = date.toISOString().substring(0, 10);
    date_selector.value = date_string;
}
set_date_to_today()

var table = document.getElementById("record_table");

function clear_table() {
    table.innerHTML = "";
}

function number_of_existing_exercises() {
    var html = table.innerHTML;
    var count = (html.match(/<div class="row">/g) || []).length-1;
    return count;
}

function get_user_input_exercise(){
    var exercise_name = document.getElementById(EXERCISE_NAME_ID).value;
    var set = document.getElementById(SET_ID).value;
    var reps = document.getElementById(REPS_ID).value;
    var weight = document.getElementById(WEIGHT_ID).value;
    var rest = document.getElementById(REST_ID).value;
    var self_evaluation = document.getElementById(SELF_EVALUATION_ID).value;
    var new_exercise = new exercise(exercise_name, set, reps, weight, "kg", rest, self_evaluation); 
    return new_exercise;
}

function remove_input_row() {
    document.getElementById(CURRENT_INPUT).remove();
}

function parse_to_JSON(exercise){
    var parse_result = "";
    try {
        parse_result = JSON.parse(JSON.stringify(exercise)) && !!exercise;
    } catch (e) {
        parse_result = false;
    }
    return parse_result;
}


function add_exercise_to_table(){
    var exercise = get_user_input_exercise();
    remove_input_row();
    var exercise_HTML = 
    `<div class="row">
        <div class="col-1">${number_of_existing_exercises()+1}</div>
        <div class="col-2">${exercise.exercise_name}</div>
        <div class="col-2">${exercise.set}</div>
        <div class="col-2">${exercise.reps}</div>
        <div class="col-2">${exercise.weight}</div>
        <div class="col-2">${exercise.rest}</div>
        <div class="col-1">${exercise.self_evaluation}</div>
    </div>`
    table.innerHTML += exercise_HTML;
    add_new_input_group();
}

const EXERCISE_NAME = "動作";
const EXERCISE_NAME_ID = "exercise-name";
const SET = "組數";
const SET_ID = "set";
const REPS = "次數";
const REPS_ID = "reps";
const WEIGHT = "重量(kg)";
const WEIGHT_ID = "weight";
const REST = "組間休息(s)";
const REST_ID = "rest";
const SELF_EVALUATION = "自評";
const SELF_EVALUATION_ID = "self-evaluation";
const CURRENT_INPUT = "current_input";

function style_width(width) {
    //var style = `style="width:${width}%"`;
    var style = `class="col-${width}"`;
    return style;
}

function create_input(id, type, placeholder, min, max){
    var attribute_min = "";
    var attribute_max = "";
    if(min != undefined){
        var attribute_min = `min="${min}"`;
    }
    if(max != undefined){
        var attribute_max = `max="${max}"`;
    }
    
    var input_tag = `<input type=${type} ${style_width(12)} id=${id} placeholder=${placeholder} ${attribute_min} ${attribute_max}>`;
    return input_tag;
}

function create_dropdown(id, min, max) {
    var dropdown =
    `<select class="form-select" id=${id} aria-label="Default select example">
        <option selected></option>`
    for(i=min; i<=max; i++){
        dropdown += `<option value="${i}">${i}</option>`;
    }
    dropdown += `</select>`;
    return dropdown;
}

function add_new_input_group() {
    var input_group = 
    `<div class="row" id=${CURRENT_INPUT}>
        <div class="col-1"><button type="button" class="btn btn-primary" onclick="add_exercise_to_table()">add</button></div>
        <div class="col-2">${create_input(EXERCISE_NAME_ID, "text", EXERCISE_NAME)}</div>
        <div class="col-2">${create_input(SET_ID, "number", SET, 0)}</div>
        <div class="col-2">${create_input(REPS_ID, "number", REPS, 0)}</div>
        <div class="col-2">${create_input(WEIGHT_ID, "number", WEIGHT, 0)}</div>
        <div class="col-2">${create_input(REST_ID, "number", REST, 0)}</div>
        <div class="col-1">${create_dropdown(SELF_EVALUATION_ID, 0, 9)}</div>
    </tr>`;
    
    table.innerHTML += input_group;    
}
add_new_input_group();
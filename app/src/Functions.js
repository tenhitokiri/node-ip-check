//fizzBuzz function
function fizzBuzz(input){
    let output = [];
    if (!isNaN(input)) {
        for(var i = 1; i <= input; i++){
            if(i % 3 == 0 && i % 5 == 0){
                output.push("FizzBuzz");
            }else if(i % 3 == 0){
                output.push("Fizz");
            }else if(i % 5 == 0){
                output.push("Buzz");
            }else{
                output.push(i);
            }
        }
    } else {
        output = "Invalid input";
    }
    return output;
}

module.exports = fizzBuzz
function run() {

    function getRandomColor() {

        // range of Math.random(): [0,1)
        // Generating random nubmers for [a, b]: parseInt(a + Math.random()*(b+1-a))
        let val1 = parseInt(0 + Math.random() * (255 + 1 - 0));
        let val2 = parseInt(0 + Math.random() * (255 + 1 - 0));
        let val3 = parseInt(0 + Math.random() * (255 + 1 - 0));
        return `rgb(${val1}, ${val2}, ${val3})`;

    }

    let random_color = `${getRandomColor()}`;

    /* do {
        
        var view = prompt("1:) To choose gradient between conic & linear, view: \n -> 'c' or 'C' for conic \n -> 'l' or 'L' for linear");
        
        if (view != 'c' && view != 'l' && view != 'C' && view != 'L') {
            alert("Please enter 'c' or 'C' for conic or 'l' or 'L' for linear");
            
        }
        
    } while (view != 'c' && view != 'l' && view != 'C' && view != 'L');
    
    do {
        
        var set_time = Number(prompt("2:) Set the time interval (in 'milliseconds') with which the color changes randomly:\n(Negative interval or no input will be treated as 0 interval)"));
        
        if (isNaN(set_time)) {
            alert("Please enter a valid time interval");
        }
        
    } while (isNaN(set_time));
    
    do {
        
        var n = Number(prompt("3:) Enter number of random colors:"));
        
        if (isNaN(n) || n < 1 || Number.isInteger(n) == false) {
            alert("Please enter a positive integer greater than or equal to '1'");
        }
        
    } while (isNaN(n) || n < 1 || Number.isInteger(n) == false); */

    var color = document.getElementById("color")
    var time = document.getElementById("time")
    var _view = document.getElementById("view")

    var n = Number(color.value)
    var set_time = time.value
    var view = _view.value

    console.log(Number.isInteger(n))
    if (n < 0) {


        document.getElementById("error").innerText = "Please enter a positive integer in 'Number of Colors'!"
        document.getElementById("error").style.color = "red"

    }
    else if (Number.isInteger(n) == false || n == "") {
        if (n == "") {

            document.getElementById("error").innerText = "Please enter 'Number of Colors'!"
            document.getElementById("error").style.color = "red"
        }
        else if (Number.isInteger(n) == false) {
            document.getElementById("error").innerText = "Please enter a positive integer in 'Number of Colors'!"
            document.getElementById("error").style.color = "red"
        }

    }
    else if (view == "select") {
        document.getElementById("error").innerText = "Please select 'View'!"
        document.getElementById("error").style.color = "red"
    }
    else {
        document.body.children[0].style.display = 'none';
        alert("Double click on the screen to reload!")
        document.body.style.cursor = "pointer";
        document.body.addEventListener("dblclick", () => {
            let cnf1 = confirm("Are you sure you want to reload?");
            if (cnf1) {

                window.location.reload();
            }
        })
    }

    // color.addEventListener("change", ()=>{
    //     // set_time = time.value
    //     // view = _view.value
    //     n = color.value
    //     run()
    // })
    // time.addEventListener("change", ()=>{
    //     // n = color.value
    //     // view = _view.value
    //     set_time = time.value
    //     run()
    // })
    // _view.addEventListener("change", ()=>{
    //     // n = color.value
    //     // alert("warning")
    //     // set_time = time.value
    //     view = _view.value
    //     run()
    // })

    // let n = Number(prompt("1:) Enter the number of random colors:"));
    // let set_time = Number(prompt("2:) Set the time interval (in 'milliseconds') with which the color changes randomly:\n(Negative interval or no input will be treated as 0 interval)"));
    // let view = prompt("3:) To choose gradient between conic & linear, Enter: \n -> 'c' or 'C' for conic \n -> 'l' or 'L' for linear");
    // alert("𝘙𝘢𝘯𝘥𝘰𝘮 𝘋𝘪𝘴𝘤𝘰 𝘓𝘪𝘨𝘩𝘵 𝘚𝘪𝘮𝘶𝘭𝘢𝘵𝘰𝘳 (𝘸𝘪𝘵𝘩 💖 𝘣𝘺 '𝘬𝘶𝘮𝘢𝘳 𝘴𝘢𝘯𝘶')");


    function number(n) {

        var ch = `${getRandomColor()}, `;

        if (n == parseInt(n)) {

            while (n >= 2) {
                ch += `${getRandomColor()}, `;
                n = n - 1;
            }

            return ch;
        }

    }

    setInterval(() => {
        random_color = `${getRandomColor()}`;
    }, `${set_time}`);

    if (n == 1) {

        document.body.style.backgroundColor = `${getRandomColor()}`
        setInterval(() => {
            document.body.style.backgroundColor = `${getRandomColor()}`
        }, `${set_time}`);
    }

    else if (n > 1) {

        if (view == "c" || view == "C" || view == "conic" || view == "Conic") {

            document.body.style.background = `conic-gradient(${random_color}, ${number(n - 1)} ${random_color})`;
            setInterval(() => {
                // document.body.style.backgroundColor = `${getRandomColor()}`
                document.body.style.background = `conic-gradient(${random_color}, ${number(n - 1)} ${random_color})`;
            }, `${set_time}`);

        }
        else if (view == "l" || view == "L" || view == "linear" || view == "Linear") {

            document.body.style.background = `linear-gradient(${number(n - 1)} ${random_color})`;
            console.log(set_time)
            setInterval(() => {
                // document.body.style.backgroundColor = `${getRandomColor()}`

                document.body.style.background = `linear-gradient(${number(n - 1)} ${random_color})`;
            }, `${set_time}`);

        }
    }

}
// document.addEventListener("keydown", (event) => {
//     if (event.key == "Enter") {
//         run();
//     }
// })
// issue: each time i press enter, speed increases
// try: should try again after adding feature which resets values
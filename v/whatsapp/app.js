//Function to send a message to whatapp from a web application.
function send_message() /*void */ {
    //Get the phone number
    const num /*number*/ = document.getElementById("number").value;
    //get the name
    const name /*string */ = document.getElementById("name").value;
    //get the message
    const msg /*string */ = document.getElementById("msg").value;
    //link to open the whatsapp application, get the supplied data and open a
    //new chat account with the data.
    var win = window.open(`https://wa.me/?text=${name}${msg}`, '_blank');
}

        //Show/hide the identified HTML element depending on the display option.
        function show(display, id) {
            //
            //Get the identified element.
            const element = get_element(id);
            //
            //Show/hide it.
            element.hidden = !display;
        }
        //
        //This is a generalized function that get general html elements by providing
        //its identifier. Since we initially don't know the type of the element,
        //we can get any HTMLElement then typescript will know the element's type by
        //checking its usages,
        //e.g., public next: HTMLButtonElement,
        //      public div: HTMLDivElement.
        function get_element(id) {
            //
            //Get the identified element from the current browser context.
            const element = document.querySelector(`#${id}`);
            //
            //Check the element for a null value
            if (element === null) {
                const msg = `The element identified by '#${id}' not found`;
                alert(msg);
                throw new Error(msg);
            }
            //
            //Since we don't know the exact type of the element we are getting,
            //we make it unknown first then typescript will know the element's type by
            //checking its usages,
            //e.g., public next: HTMLButtonElement,
            //      public div: HTMLDivElement.
            return element;
        }

        //
        //Listen as the user type a message and display untranslated words on a div area.
        function untranslated() {
            //
            //Get the textarea element.
            const textarea = get_element("msg");
            //
            //Get the div element for displaying untranslated words.
            const div = get_element("untranslated");
            //
            //Attach an event listener to the textarea.
            textarea.addEventListener("keyup", (e) => {
                if (e.code === "Space") {
                    //
                    //Get the textarea value.
                    const val = textarea.value;
                    //
                    //Get the last typed word.
                    const split_val = value.split();
                    //
                    //The last typed word in the textarea box.
                    const last = split_val[split_val.length - 1];
                    //
                    alert(last);
                }
            });
        }
class FormUI{

    form = null;

    init(config){
        this.form = document.createElement("form");
        this.form.id = config.id;
        this.form.addEventListener("submit", config.action);

        let container = null;

        if(config.container){
            container = document.querySelector("." + config.container);
        }else{
            container = document.createElement("div");
        }

        if(config.desc){
            const parrafoForm = document.createElement("p");
            parrafoForm.textContent = config.desc;
            container.insertBefore(parrafoForm, container.firstChild);
        }

        if(config.name){
            const tituloForm = document.createElement("h1");
            tituloForm.textContent = config.name; 
            container.insertBefore(tituloForm, container.firstChild);
        }

        config.fields.forEach((element, index) => {
            let inputField = document.createElement("input");

            this.validateElement(inputField, element, index);

            for(let prop in element) {
                if(prop != "event"){
                    inputField.setAttribute(prop, element[prop])
                }else{
                    inputField.addEventListener(element[prop][0], element[prop][1]);
                }
            }

            switch(element.type) {
                case "checkbox":
                    this.createCheckbox(container, element, inputField);
                case "text":
                    // this.createText(container, element, inputField);
                case "range":
                    // this.createRange(container, element, inputField);
            }

        });
    }

    createCheckbox(container, element, inputField) {
        let object = null;
        inputField.type = "checkbox";
        this.form.appendChild(inputField);

        if(!element.target){
            console.log("funciona igual")
        }

        if(element.target == undefined) {
            object = document.createElement("div");
            object.className = "check";
            
            if(element.label){
                let label = this.buildLabel(element);
                container.appendChild(label);
            }
            
            container.appendChild(object);
        }else {
            object = document.getElementById(element.target);
            object.className = "check";
        }

        object.addEventListener("click", () => {
            object.classList.toggle("checked");

            if(object.classList.contains("checked")) {
                inputField.setAttribute("checked", true);
            } else {
                inputField.setAttribute("checked", false);
            }
            console.log(this.form)
        });

        
    }

    buildLabel(value){
        if(!value.label) {
            return null;
        }

        let divLabel = document.createElement("div");
        const etiqueta = document.createElement("label");

        if(!value.name) {
            value.name = value.id + "label";
        }

        etiqueta.setAttribute("for", value.name);
        etiqueta.textContent = value.name;

        divLabel.appendChild(etiqueta);
        divLabel.appendChild(document.createElement("br"));

        return divLabel;
    }

    validateElement(inputField, element, index){
        if(!inputField.id) {
            inputField.id = "field" + this.form.id + index;
        }else{
            inputField.id = element.id;
        }

        if(!inputField.type){
            inputField.type = "text";
        }
    }
}

export { FormUI };
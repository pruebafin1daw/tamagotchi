class FormUI{

    form = null;
    data = null;

    init(config){
        this.form = document.createElement("form");
        this.form.id = config.id;
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();

            if(config.action) {
                this.data = new FormData();
                let formChildren = this.form.childNodes;
                formChildren.forEach((element, index) => {
                    if(element.id != "submit"){
                        this.data.append(element.id, element.value);
                    }
                });
            }
        });

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
                if(prop == "event"){
                    inputField.addEventListener(element.event.type, element.event.action);
                }else if (prop == "label") {
                    container.appendChild(this.buildLabel(element));
                }else {
                    inputField.setAttribute(prop, element[prop])
                }
            }

            switch(element.type) {
                case "checkbox":
                    this.createCheckbox(container, element, inputField);
            }

            this.form.appendChild(inputField);
            container.appendChild(this.form);
        });
    }

    createCheckbox(container, element, inputField) {
        let object = null;

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
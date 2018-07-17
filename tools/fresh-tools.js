dom(tag, attrs, ...children) {
    // Custom Components will be functions
    if (typeof tag === 'function') {
        return new tag();
    }
    // regular html tags will be strings to create the elements
    if (typeof tag === 'string') {
        // fragments to append multiple children to the initial node
        const fragments = document.createDocumentFragment();
        // create the DOM element
        const element = document.createElement(tag);
        // iterrate over the children
        children.forEach(child => {
            console.log(child);
            // if the child is an HTML Element
            if (child instanceof HTMLElement) {
                // append the html element to the fragment container
                fragments.appendChild(child)
            // if it's a string
            } else if (typeof child === 'string') {
                // create a text Node out of the contents
                const textnode = document.createTextNode(child)
                // append the text node to the fragment container
                fragments.appendChild(textnode)
            } else {
                // later other things could not be HTMLElement not strings
                console.log('not appendable', child);
            }
        });
        
        element.appendChild(fragments);
        // Merge element with attributes
        Object.assign(element, attrs);
        console.log(element);
        return element;
    }
}
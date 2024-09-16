(function () {
    'use strict';

    // fetch data from the server
    // method = 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
    async function doFetch(url, method, data = null, /* leagcy */ callback = null ) {

        const fetchOptions = {
            method: method,
            headers: {}
        };

        // Only attach the body for methods that typically use a body payload
        if (data !== null && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(data);
        }

        // Return the Promise to allow for both callback and promise-based handling
        try {
            const response = await fetch(url, fetchOptions);
            if (!response.ok) {
                console.error('Error:', response);
                return null;
            }
            const response_1 = await response.json();
            if (callback) {
                callback(response_1);
            }
            return response_1;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }


    // get the IP and socket name from the server
    // test with: curl -X GET http://localhost:3000/ipsocket
    async function getIPSocket() {
        try {
            let response = await doFetch('ipsocket',"GET");
            return response;
        }
        catch (error) {
            console.error('Error:', error);
            return null;
        }
    }


    // get percentage of likert scale
    async function likertPercentage(id){
        console.log(`get likert/${id}`);
        try {
            let response = await doFetch(`likert/${id}`,"GET");
            console.log(response);
            return response['likert'];
        }
        catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    // Description: This file contains the list of team members.
    const icons = [ { name: "Ameise", path: "animal-ant-domestic-svgrepo-com.svg"},
                    { name: "Fisch", path: "animal-aquarium-domestic-svgrepo-com.svg"},
                    { name: "Thunfisch", path: "animal-aquarium-domestic2-svgrepo-com.svg"},
                    { name: "Kücken", path: "animal-babyduck-domestic-svgrepo-com.svg"},
                    { name: "Fledermaus", path: "animal-bat-domestic-3-svgrepo-com.svg"},
                    { name: "Vogel", path: "animal-bird-domestic-2-svgrepo-com.svg"},
                    { name: "Papagei", path: "animal-bird-domestic-4-svgrepo-com.svg"},
                    { name: "Eisvogel", path: "animal-bird-domestic-svgrepo-com.svg"},
                    { name: "Schmetterling", path: "animal-bug-butterfly-svgrepo-com.svg"},
                    { name: "Libelle", path: "animal-bug-domestic-2-svgrepo-com.svg"},
                    { name: "Fliege", path: "animal-bug-domestic-4-svgrepo-com.svg"},
                    { name: "Biene", path: "animal-bug-domestic-6-svgrepo-com.svg"},
                    { name: "Käfer", path: "animal-bug-domestic-svgrepo-com.svg"},
                    { name: "Bulle", path: "animal-bull-domestic-svgrepo-com.svg"},
                    { name: "Katze", path: "animal-cat-domestic-2-svgrepo-com.svg"},
                    { name: "Kater", path: "animal-cat-domestic-svgrepo-com.svg"},
                    { name: "Kuh", path: "animal-cow-domestic-svgrepo-com.svg"},
                    { name: "Krabbe", path: "animal-crab-domestic-svgrepo-com.svg"},
                    { name: "Krokodil", path: "animal-crocodile-domestic-svgrepo-com.svg"},
                    { name: "Hund", path: "animal-dog-domestic-3-svgrepo-com.svg"},
                    { name: "Bernhardiner", path: "animal-dog-domestic-svgrepo-com.svg"},
                    { name: "Taube", path: "animal-domestic-dove-svgrepo-com.svg"},
                    { name: "Gibbon", path: "animal-domestic-face-2-svgrepo-com.svg"},
                    { name: "Bär", path: "animal-domestic-face-3-svgrepo-com.svg"},
                    { name: "Schimpanse", path: "animal-domestic-face-4-svgrepo-com.svg"},
                    { name: "Frosch", path: "animal-domestic-frog-svgrepo-com.svg"},
                    { name: "Giraffe", path: "animal-domestic-giraffe-svgrepo-com.svg"},
                    { name: "Igel", path: "animal-domestic-hedgehog-svgrepo-com.svg"},
                    { name: "Koala", path: "animal-domestic-koala-svgrepo-com.svg"},
                    { name: "Löwe", path: "animal-domestic-lion-svgrepo-com.svg"},
                    { name: "Maus", path: "animal-domestic-mouse-svgrepo-com.svg"},
                    { name: "Octopus", path: "animal-domestic-octopus-2-svgrepo-com.svg"},
                    { name: "Qualle", path: "animal-domestic-octopus-3-svgrepo-com.svg"},
                    { name: "Tintenfisch", path: "animal-domestic-octopus-svgrepo-com.svg"},
                    { name: "Gorilla", path: "animal-domestic-orangoutang-svgrepo-com.svg"},
                    { name: "Orangutan", path: "animal-domestic-orangoutang2-svgrepo-com.svg"},
                    { name: "Eule", path: "animal-domestic-owl-svgrepo-com.svg"},
                    { name: "Panda", path: "animal-domestic-panda-svgrepo-com.svg"},
                    { name: "Nasshorn", path: "animal-domestic-pet-12-svgrepo-com.svg"},
                    { name: "Orca", path: "animal-domestic-pet-13-svgrepo-com.svg"},
                    { name: "Schildkröte", path: "animal-domestic-pet-15-svgrepo-com.svg"},
                    { name: "Hai", path: "animal-domestic-pet-17-svgrepo-com.svg"},
                    { name: "Wal", path: "animal-domestic-pet-2-svgrepo-com.svg"},
                    { name: "Esel", path: "animal-domestic-pet-3-svgrepo-com.svg"},
                    { name: "Schlange", path: "animal-domestic-pet-5-svgrepo-com.svg"},
                    { name: "Biber", path: "animal-domestic-pet-6-svgrepo-com.svg"},
                    { name: "Schnecke", path: "animal-domestic-pet-7-svgrepo-com.svg"},
                    { name: "Schwein", path: "animal-domestic-pet-svgrepo-com.svg"}
    ];

    function isValidUUID(uuid) {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return regex.test(uuid);
    }

    async function createTeam(){
        // create a svg drawing by placing above icons in a grid using svg.js
        const draw = SVG().size('100%', '100%').addTo('#svg-team').size(1200, 620);
        let x = 0;
        let y = 0;
        let width = 95;
        let height = 95;
        let iconCount = 0;
        // log session storage
        if (! isValidUUID(localStorage.getItem('uuid'))) localStorage.setItem('uuid',uuid.v4());
        console.log('localStorage:', localStorage);
        // check whether the nickname is already set, otherwise remove it
        let uuid_nr = localStorage.getItem('uuid');
        let name = null;
        let response = await doFetch(`nickname/${uuid_nr}`,"GET");
        let ip_socket = await getIPSocket();
        console.log('ip_socket:', ip_socket);

        // check for reponse is null
        if (response == null) {
            console.error('Error fetching nickname: cannot create team');
            return;
        }

        if ("warning" in response) name = null;
        else name = response.nickname;
        localStorage.removeItem('nickname');
        if (name) {
            localStorage.setItem('nickname', name);
            console.log('Nickname set in localStorage');
        } else {
            console.log('No name received, nickname not set.');
        }
        console.log('localStorage:', localStorage);
        // create a text board in bold
        let board = draw.text(`Hallo\n${localStorage.getItem('nickname') || ''}`)
                    .move(900, 300)
                    .font({ size: 48, weight: 'bold' })
                    .fill('black');
        // create a footer text
        changeFooter(`${localStorage.getItem('nickname') || 'NOT YET LOGGED IN'}`);
        draw.rect(770, 585).fill('white').stroke({ width: 1, color: 'black' });
        // draw.text('Ping: 0').move(850, 10).font({ size: 16 }).fill('black').id('pingCounter');
        draw.text(localStorage.getItem('uuid')).move(850, 30).font({ size: 16 });
        draw.text(`${ip_socket.ip}:${ip_socket.socketNr}`).move(850, 50).font({ size: 16 });
        // draw.text(localStorage.getItem('nickname')).move(850, 50).font({ size: 16 })
        let icon = icons[iconCount];
        while (icon) {
            let group = draw.group().translate(x, y).addClass('icon-group');
            group.image(`images/icons/${icon.path}`, width, height)
                .size(width, height).opacity(0.3)
                .id(`icon-${icon.name}`);
            group.text(icon.name)
                .font({ size: 12 })
                // background color for the text
                .fill('white')
                .stroke('gray')
                .center(width/2, height );
            // show hand cursor on hover
            
            // on click, show an alert with the name of the icon
            // Capture the current icon and set up a click event to post the name

            // only when currentNickname is null, we can click on the icons
            if (localStorage.getItem('nickname') == null) {
                group.addClass('clickable').click(((currentIcon, currentGroup) => {
                    //console.log(`icon ${currentIcon.name} clicked`);
                    draw.findOne(`#icon-${currentIcon.name}`);
                    // check if the icon is clickable
                    //console.log(icon.hasClass('clickable'));
                    return () => {
                        const postData = {
                            name: currentIcon.name,
                            uuid: localStorage.getItem('uuid')
                        };
                        fetch('nickname', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(postData)
                        })
                        .then(response => response.json())
                        .then(data => {
                            showToast(`Logged in!`);
                            // change board text
                            board.text(`Hallo\n${postData.name}!`);
                            localStorage.setItem('nickname', postData.name);
                            localStorage.setItem('uuid', postData.uuid);
                            // change footer text
                            changeFooter(`${postData.name}`);
                            // fetch names from server and update icons
                            fetchNamesAndUpdateIcons();
                            // disable click for all group-icons
                            draw.find('.icon-group').forEach(currentGroup => {
                                currentGroup.off('click');
                            });
                            draw.find('.clickable').forEach(currentIcon => {   
                                currentIcon.removeClass('clickable');
                            });
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            showToast(`Error: ${error.message}`, true);
                        });
                    };
                })(icon));
            }
            x += width;
            if (x >= 750) {
                x = 0;
                y += height;
            }
            iconCount++;
            icon = icons[iconCount];
        }    // fetch names from server and update icons
        fetchNamesAndUpdateIcons();

    }
    // ------------------------------ handle events ----------------------------

    const eventSource$2 = new EventSource('events');
    let pingCount = 0;

    eventSource$2.addEventListener('PING', function(event) {
        console.log('Ping received:', event);
        pingCount++;
        document.getElementById('pingCounter').textContent = `Ping count: ${pingCount}`;
    });

    eventSource$2.addEventListener('NICKNAME', function(event) {
        console.log('Nickname received:', event);
        const data = JSON.parse(event.data);
        console.log('New nickname:', data.nicknames);
        data.nicknames.forEach(name => updateIconOpacity(name));
    });

    eventSource$2.onopen = function() {
        console.log('Connection opened.');
    };

    eventSource$2.onerror = function(event) {
        console.log('EventSource encountered an error:', event);
    };
    // ------------------------------ functions -----------------------------


    // Function to fetch the names from the server and update the icons
    async function fetchNamesAndUpdateIcons() {
        try {
            const response = await doFetch('nicknames', 'GET');
            // Log fetched names
            console.log('Fetched names:', response.nicknames);
            
            // Update the icons based on the fetched names
            icons.forEach(icon => {
                if (response.nicknames.includes(icon.name)) {
                    // If the name is in the list, set the opacity to 1
                    updateIconOpacity(icon.name);
                }
            });
        } catch (error) {
            console.error('Error fetching names:', error);
        }
    }


    // Function to update the opacity of the icon
    function updateIconOpacity(name) {
        const icon = document.getElementById(`icon-${name}`);
        if (icon) {
            icon.style.opacity = 1;
            // remove the clickable class
            icon.classList.remove('clickable');
            // get parent group and remove the click event
            // const group = icon.parentElement;
            // group.off('click');
        } else {
            console.error('Icon not found for:', name);
        }
    }

    // show a toast message, by appending a div to the toast-container (see interaktive.js) temporarily
    function showToast(message, isError = false) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast-message toast-show';
        toast.textContent = message;
        if (isError) {
            toast.style.backgroundColor = 'red';
        }
        container.appendChild(toast);
        setTimeout(() => {
            toast.className = toast.className.replace('toast-show', '');
            setTimeout(() => container.removeChild(toast), 500);
        }, 3000);
    }

    // change the footer text by getting the first footer element and updating the paragraph text
    function changeFooter(footerText) {
        // Get the first element with the class 'footer'
        var footerElements = document.getElementsByClassName('footer');
        
        if (footerElements.length === 0) {
            console.error('No footer element found');
            return; // Exit the function if no footer element is found
        }
        
        // Assuming the footer is a simple div or similar element
        var footer = footerElements[0]; // Get the first (or only) 'footer' element
        
        // Get the paragraph element within the footer, assuming there's at least one
        var paragraph = footer.getElementsByTagName('p')[0];
        
        if (!paragraph) {
            // If no paragraph exists, create one and append it to the footer
            paragraph = document.createElement('p');
            footer.appendChild(paragraph);
        }
        
        // Change the text content of the paragraph element
        paragraph.textContent = footerText;
    }

    // button to toggle visibility of the svg element

    function getSVG(element, argConfig) {
        const defaults = { width: 1050, height: 600 };
        const config = { ...defaults, ...argConfig };
        return SVG().size('100%', '100%').addTo(element).size(config.width, config.height);

    }

    ///////////////////////////////////////////// HTML DRAWING FUNCTIONS ///////////////////////////////////////

    function createHTMLButton(text, id, argConfig) {
        const defaults = {class: 'button', callback: () => console.log('Button clicked') };
        const config = { ...defaults, ...argConfig };
        const button = document.createElement('button');
        button.setAttribute('id', id);
        button.setAttribute('class', config.class);
        button.textContent = text;
        button.addEventListener('click', config.callback);
        return button;
    }

    ///////////////////////////////////////////// SVG DRAWING FUNCTIONS ///////////////////////////////////////


    function origin(draw, x, y, argConfig) {
        // radius = 5, fillColor = 'red'
        const defaults = {radius: 5, fillColor: 'red'};
        const config = { ...defaults, ...argConfig };
        // Add a circle to the SVG drawing at the specified position
        draw.circle(config.radius * 2)  // The diameter is twice the radius
            .fill(config.fillColor)     // Set the fill color
            .center(x, y);       // Position the center of the circle at (x, y)
    }

    function createSVGText(text, x, y, argConfig)  {
        const defaults = { anchor: 'left', size: 18, color: 'black' };
        const config = { ...defaults, ...argConfig };
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', x);
        textElement.setAttribute('y', y);
        textElement.setAttribute('fill', config.color);
        textElement.setAttribute('font-family', 'Arial');
        textElement.setAttribute('font-size', config.size);
        textElement.setAttribute('text-anchor', config.anchor);  // Centers text horizontally
        textElement.setAttribute('dominant-baseline', 'text-before-edge');  // Aligns text top to y coordinate
        if (config.hidden) {
            textElement.setAttribute('visibility', 'hidden');  // Hides the element if hidden is true
        }
        textElement.textContent = text;
        return textElement;
    }

    function rectWithText(draw, x, y, width, height, textFn, argConfig) {
        // Default configuration rx="2px", ry="2px",  textStroke ="white", fill = "gray", stroke = "black", strokeWidth = 1
        const defaults = { rx: 5, ry: 5, fontSize: 14, textStroke: 'white', rectFill: 'black', rectStroke: 'black', rectStrokeWidth: 1, 
                           callback: () => {console.log(`rectWithText "${textFn()}" clicked`);},
                           args: [] 
                         };
        const config = { ...defaults, ...argConfig };
        // Create a group and transform it to the specified x and y coordinates
        let group = draw.group().translate(x, y);

        // Add a rectangle to the group
        group.rect(width, height)
             .radius(config.rx, config.ry)           // Set the rounded corners
             .fill(config.rectFill)               // Set the fill color
             .addClass('clickable')
             .stroke({ width: config.rectStrokeWidth, color: config.rectStroke });  // Set the stroke width and color

        // Add text to the group, centered in the middle of the rectangle
        let text = group.text(textFn())
             .font({ anchor: 'middle', fill: config.textStroke, size: config.fontSize })  // Center the text horizontally and set the text color
             .addClass('clickable')
             .center(width / 2, height / 2);            // Move the text to the center of the rectangle

        // If a callback function is provided, add it to the group
        if (config.callback) {
            group.click(() => config.callback(text,...config.args));
        }
    }

    function estimateTextWidth(draw, text, fontFamily, fontSize) {
        // Average width of a character relative to the font size
        const averageCharWidthFactor = 0.5; // Adjust this factor as needed

        // Estimate the text width
        const estimatedWidth = text.length * fontSize * averageCharWidthFactor;

        console.log('estimateTextWidth:', text, fontSize, estimatedWidth);
        return estimatedWidth;
    }

    ///////////////////////////////////////////// BOARD FUNCTIONS ///////////////////////////////////////

    function postIt(draw, text, x, y, maxWidth=100, lineHeight=18, maxHeight=50) {
        console.log('postIt:', text, x, y, maxWidth, lineHeight, maxHeight);
        const words = text.split(" ");
        console.log('- words:', words);
        let leftMargin = lineHeight/2;
        let topMargin = lineHeight/8;
        let size = lineHeight;
        let lineX = x + leftMargin;
        let lineY = y + topMargin;
        maxWidth = maxWidth - leftMargin;

        // holds the lines of text and x, y coordinates
        let lines = [];
        let line = '';
        let height = topMargin*3;
        words.forEach(function(word) {
            console.log('- - word:', word);
            const testLine = line + word + ' ';
            // get the width of the text without rendering it
            const testWidth = estimateTextWidth(draw, testLine, 'Arial', size);
            console.log("- - - ",testWidth, testLine, line, height, maxWidth);
            // If the line is too long, wrap the text
            if (testWidth > maxWidth) {
                lines.push({text: line});
                line = word + ' ';
                height += lineHeight*1.1;
            } else {
                line = testLine;
            }
            // draw.text(line).move(x+leftMargin, y + (lineNumber * lineHeight)).font({ family: 'Arial', size: size });
        });
        lines.push({text: line});
        height += lineHeight;
        // Create a group for the post-it note
        const group = draw.group();
        if (height < maxHeight) {
            height = maxHeight;
        }
        group.rect(120, height).attr({ fill: '#f9f79c', stroke: '#333', 'stroke-width': 2 }).move(x, y);
        // console.log({lines});
        lines.forEach(function(line) {
            const textElement = createSVGText(line.text, lineX, lineY, {anchor: 'left', size: 14, color: 'black'});
            group.node.appendChild(textElement);
            lineY = lineY + lineHeight;
            // group.text(line.text).move(line.x, line.y).font({ family: 'Arial', size: size }).attr('dominant-baseline', 'text-before-edge');
        });
        // show hand cursor on hover
        group.addClass('clickable');
        // Make the group draggable
        group.draggable();
    }


    function createBoardD3(draw, texts, boardWidth, boardHeight) {
        // assert texts is an array and not empty of an array of arrays
        if (!Array.isArray(texts) || texts.length === 0 || Array.isArray(texts[0])) {
            console.error('Invalid input type for createBoardD3:', texts);
            return;
        }
        // log type of texts

        const nodes = texts.map(text => ({
            x: Math.random() * boardWidth*0.8,
            y: Math.random() * boardHeight*0.9,
            text: text
        }));

        console.log('nodes:', nodes);



        const simulation = d3.forceSimulation(nodes)
            .force('x', d3.forceX(d => d.x).strength(0.5))
            .force('y', d3.forceY(d => d.y).strength(0.5))
            .force('collide', d3.forceCollide(60)) // Adjust collision radius based on post-it size
            .stop();

        for (let i = 0; i < 120; ++i) simulation.tick(); // Run simulation to space out elements

        nodes.forEach(node => {
            console.log('Creating post-it:', node.text, node.x, node.y);
            postIt(draw, node.text, node.x, node.y, 110, 18);
        });

        draw.rect(boardWidth, boardHeight).fill('none').stroke({ color: '#333', width: 2 });
    }


    function createToggleVisibilityButton(target, argConfig) {
        const defaults = {class: 'clickable', text:":::", callback: () => console.log('Button clicked') };
        const config = { ...defaults, ...argConfig };
        const button = document.createElement('button');
        button.setAttribute('class', config.class);
        button.textContent = config.text;
        button.addEventListener('click', () => {
            console.log('Button clicked:', target);
            if (!(target instanceof Element)) {
                console.log('Target is not a valid DOM element:', target);
                return;
            }
            if (target.style.display === 'none') {
                target.style.display = 'block';
            } else {
                target.style.display = 'none';
            }
        });
        return button;
    }


    // create a results board, append it to the element and update it via server-sent events
    async function resultsBoard(element, argConfig){
        console.log('resultsBoard', element, argConfig);
        const defaults = { width: 1050, height: 550, fieldname: 'answers',hidden: false};
        const config = { ...defaults, ...argConfig };
        // create an svg drawing by placing above icons in a grid using svg.js
        // check if id starts with #, otherwise add #
        const qid = element.getAttribute('data-ref');

        // create a div element to hold the svg element and the button
        const svgDiv = document.createElement('div');
        // create a button to toggle visibility of the svg element
        const button_visibility = createToggleVisibilityButton(svgDiv, {class: 'button'});
        // attach the them to the element
        element.appendChild(button_visibility);
        element.appendChild(svgDiv);
        // create a new svg drawing
        const draw = getSVG(svgDiv, config);


        // hide draw element if config.idden is true else show it
        if (config.hidden) {
            svgDiv.style.display = 'none';
        } else {
            svgDiv.style.display = 'block';
        }

        // fetch data from the server
        try {
            // console.log(`answers/${qid}`);
            
            const data = await doFetch(`answer/${qid}`, 'GET');
            console.log(`curl -X GET http://localhost:5050/answer/${qid} gives us ${data.answers}`);
            console.log(data);
            let texts = [];
            if ("warning" in data) {
                texts = ['No data available']; 
            } else {
                console.log('Data:', data);
                console.log('Fieldname:', config.fieldname);
                texts = data.answers; // [config.fieldname];
            }
            createBoardD3(draw, texts, config.width, config.height, 120, 18);
        } catch (error) {
            console.error('Warning:', error);
        }
        // update the board via server-sent events
        console.log(`eventSource: A-${qid}`);
        eventSource.addEventListener(`A-${qid}`, function(event) {
            console.log('Event received:', event, event.data);
            // render json data
            const data = JSON.parse(event.data);
            draw.clear();
            createBoardD3(draw, data.answers, config.width, config.height);
        });
    }

    ///////////////////////////////////////////// likert scale ///////////////////////////////////////

    function likertScale(draw, id) {
        const radius = 10;
        const spacing = 150;
        const labels = [
            "Stimme voll zu",
            "Stimme eher zu", 
            "Neutral", 
            "Stimme eher nicht zu", 
            "Stimme gar nicht zu"
        ];

        let x = 0;
        // Create rectangles and text labels for each point in the Likert scale
        for (let i = 0; i < 5; i++) {
            x = (i+1) * spacing;
            // Draw rectangle
            draw.circle(radius * 2)
                .center(x, 30)
                .fill('white')
                .stroke({ width: 1, color: '#000' })
                // show hand on hover
                .addClass('clickable')
                .addClass('radio-box')
                // set id
                .attr({ id: `${id}-${i}` });

            // Add label below each rectangle
            const textElement = createSVGText(labels[i], x, 45,{ anchor: 'middle', size: 14, color: 'black' });
            draw.node.appendChild(textElement);
          
        }

        // Interaction with rectangles (optional)
        draw.find('.radio-box').click(function() {
            // console.log('Clicked on radio box');
            draw.find('.radio-box').fill('white'); // Reset all
            this.fill({ color: '#c0c0c0' });       // Highlight selected
            // post data to the server
            let value = this.attr('id').split('-')[1];
            doFetch('likert', 
                    'POST', 
                    {user:localStorage.getItem('nickname'), likert: id, value: value}, 
                    (response) => {console.log(response);}
            );
            });
    }

    function likertField(element,argConfig) {
        const draw = getSVG(element,{height:100});
        likertScale(draw,element.id);
    }

    function showPercentage(element, live=true) {
        // create div element to hold the result
        const resultDiv = document.createElement('div');
        const updateResult = async () => {
            // get data for ref attribute
            let percentage = await likertPercentage(element.getAttribute('data-ref'));
            // console.log(percentage);
            // set the text content of the element
            resultDiv.textContent = `${percentage}%`;
        };
        if(live) {
            // show the result live
            element.appendChild(resultDiv);
            eventSource.addEventListener(
                `A-${element.getAttribute('data-ref')}`, 
                function(event) {
                    // console.log('Event received:', event, event.data);
                    const data = JSON.parse(event.data);
                    resultDiv.textContent = `${data.percentage}%`;
                }); 


        } else {
            // show the result via a button click
            const resultButton = createHTMLButton( "Ergebnis", 
                                                    `button-${element.getAttribute('data-ref')}`, 
                                                    {
                                                        class: 'button', 
                                                        callback: updateResult
                                                    });
            element.appendChild(resultButton);
            element.appendChild(resultDiv);
        }
    }

    async function addSubmitOnReturn(inputField, formId) {
            inputField.addEventListener('keydown', async function (event) {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault(); // Prevent the form from submitting in the default way
                    console.log('Enter pressed to submit the form', inputField, inputField.value, formId);

                    // Assuming submitForm takes the input field's value and the form's id
                    var value = inputField.value;
                    await doFetch("answer", "POST", {"answer": value, "qid":formId, "uuid":localStorage.getItem('uuid')}, null) ;
                    inputField.value = ''; // Clear the input field
                }
            });

    }

    console.log("loaded mustererkennung.js");


    function createMustererkennung(){


        // Creating the dropdown menu HTML and appending it to the SVG container
        // TODO: it seams to block quarto next/last slide buttom: why?
        // const dropdownHTML = `
        // <div class="dropdown-content" style="top: 100px; left: 50px;">
        //     <a href="#" onclick="console.log('1 clicked!'); return false;">Link 1</a>
        //     <a href="#" onclick="console.log('2 clicked!'); return false;">Link 2</a>
        //     <a href="#" onclick="console.log('3 clicked!'); return false;">Link 3</a>
        // </div>
        // `;
        // configuration for the network visualization
        const radius = 20;  // Node radius
        const networkLeftPadding = 100;  // Left padding for the network
        const networkTopPadding = 35;  // Top padding for the network
        const nodeSpacing = radius * 4;  // Vertical spacing between nodes within a layer
        const layerSpacing = radius * 10;  // Horizontal spacing between layers

        ///////////////////////////////////////////// GLOBAL VARIABLES ////////////////////////////////////////////////

        // Create an SVG element for the network visualization
        const global_draw = SVG().size('100%', '100%').addTo('#svg-mustererkennung').size(1200, 620);
        // Data model for activations and weights
        let global_networkData = {
            nodes: [],
            weights: []
        };
        // Training data for the network
        const global_trainingData = [   [[1,1,1,1]    ,[1.0,0.0,0.0,0.0]    ], // voll
                                    [[-1,-1,-1,-1],[1.0,0.0,0.0,0.0]    ],
                                    // horizontal
                                    [[1,-1,1,-1]  ,[0.0,1.0,0.0,0.0]    ], // vertikal
                                    [[-1,1,-1,1]  ,[0.0,1.0,0.0,0.0]    ],
                                    // vertical
                                    [[1,1,-1,-1]  ,[0.0,0.0,1.0,0.0]    ], // horizontal
                                    [[-1,-1,1,1]  ,[0.0,0.0,1.0,0.0]    ],
                                    // diagonal
                                    [[1,-1,-1,1]  ,[0.0,0.0,0.0,1.0]    ], // diagonal
                                    [[-1,1,1,-1]  ,[0.0,0.0,0.0,1.0]    ],
                                    // neither one, [0.25,0.25,0.25,0.25]
                                    [[1,1,1,-1]   ,[0.25,0.25,0.25,0.25]],
                                    [[1,1,-1,1]   ,[0.25,0.25,0.25,0.25]],
                                    [[1,-1,1,1]   ,[0.25,0.25,0.25,0.25]],
                                    [[-1,1,1,1]   ,[0.25,0.25,0.25,0.25]],
                                    [[-1,-1,-1,1] ,[0.25,0.25,0.25,0.25]],
                                    [[-1,-1,1,-1] ,[0.25,0.25,0.25,0.25]],
                                    [[-1,1,-1,-1] ,[0.25,0.25,0.25,0.25]],
                                    [[1,-1,-1,-1] ,[0.25,0.25,0.25,0.25]]
                                ];
        // Show labels for the nodes for human readability
        let showLabels = false;
        let showLayers = [true, false, false, false, false];
        let weightUsage = 'zero'; // 'random', 'optimal', 'zero'

        ///////////////////////////////////////////// CONFIG NETWORK ////////////////////////////////////////////////

        const networkNodeLabels = [ ['links-oben','rechts-oben','links-unten','rechts-unten'],
                                ['links-voll','rechts-voll','links-gemischt','rechts-gemischt'],
                                ['sp-voll,gleich','sp-voll,verschieden','sp-gemischt-gleich','sp-gemischt-verschieden'],
                                ['rot-voll','schwarz-voll',
                                 'rot-schwarz-vert','schwarz-rot-vert',
                                 'rot-schwarz-hori','schwarz-rot-hori',
                                 'rot-schwarz-diag','schwarz-rot-diag'],
                                ['voll','vert','diag','hori']];  // Labels for the nodes
        const networkLayers = networkNodeLabels.map(x => x.length);  // Nodes in each layer
        const layerFunctions = [clip, clip, clip, relu, relu];  // Activation functions for each layer
        const outputLabels = ['einfarbig', 'vertikal', 'horizontal', 'schachbrett'];  // Labels for the output layer
        const boxHeight = 20; // Height of the box as background for the text
        const boxWidth = 20; // Width of the box as background for the text
        const fontSize = 12; // Font size for the text inside the box
        const textHorLeftPadding = 5; // Horizontal padding for the text inside the box
        const tri_values = [-1, 0, 1]; // Possible values for activations and weights
        const duo_values = [0, 1]; // Possible values for activations and weights
        // configuration for the matrix
        const cellSize = 50;

        const optimal_weights = [[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
                                 [[1,0,1,0],[0,1,0,1],[1,0,-1,0],[0,1,0,-1]],
                                 [[1,1,0,0],[1,-1,0,0],[0,0,1,1],[0,0,1,-1]],
                                 [[1,0,0,0],[-1,0,0,0],[0,1,0,0],[0,-1,0,0],[0,0,1,0],[0,0,-1,0],[0,0,0,1],[0,0,0,-1]],
                                 [[1,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0],[0,0,0,0,0,0,1,1]]];

        // Assert function which throws an error if the condition is false, not just a console log (like console.assert)
        function assert(condition, message) {
            if (!condition) {
                throw new Error(message);
            }
        }
        // Assert function which throws an error if the value is undefined
        function assertDefined(value, message) {
            if (value === undefined) {
                throw new Error(message);
            }
        }

        ///////////////////////////////////////////// COLOR FUNCTIONS ///////////////////////////////////////////

        // gray colors for intervals [0,1]
        function generateGrayScaleColors(numColors) {
            let colors = [];
            for (let i = 0; i < numColors; i++) {
                let grayLevel = Math.round((i / (numColors - 1)) * 255); // Calculate the gray level from 0 to 255
                let hexGray = grayLevel.toString(16).padStart(2, '0'); // Convert gray level to a two-digit hexadecimal number
                colors.push(`#${hexGray}${hexGray}${hexGray}`); // Format as a hex code
            }
            return colors;
        }
        function mapFloatToGrayColor(value, grayScaleArray) {
            if (value === 0) {
                return 'white';  // Directly return white for zero
            } else if (value === 1) {
                return 'black';  // Directly return dark red for one
            } 
            if (value < 0 || value > 1) {
                ////console.error("Value must be between 0 and 1");
                return null;  // Handle out of bounds values
            }
            value = 1 - value;
            // Calculate the nearest index in the gray scale array
            const index = Math.round(value * (grayScaleArray.length - 1));
            return grayScaleArray[index];
        }
        // red colors for intervals [-1,1], negative values are black to white, positive values are white to red
        function generateColorScales(numColors) {
            let grayColors = [];
            let redColors = [];
        
            for (let i = 0; i < numColors; i++) {
                // Grayscale from black to white
                let grayLevel = Math.round((i / (numColors - 1)) * 255);
                let hexGray = grayLevel.toString(16).padStart(2, '0');
                grayColors.push(`#${hexGray}${hexGray}${hexGray}`);
        
                // Red scale from white to dark red
                let redLevel = Math.round((1 - i / (numColors - 1)) * 255);
                let hexRed = redLevel.toString(16).padStart(2, '0');
                redColors.push(`#${hexRed}0000`);
            }
            return { grayColors, redColors };
        }
        // generate the gray scale colors
        const grayScaleArray = generateGrayScaleColors(100);
        // generate the red scale colors
        const { grayColors, redColors } = generateColorScales(100);
        // map float to color
        function mapFloatToColor(value, grayScaleArray, redScaleArray) {
            if ( value === 0) {
                return 'white';  // Directly return white for zero
            } else if (value === -1) {
                return 'darkred';  // Directly return dark red for one
            } else if (value === 1) {
                return 'black';  // Directly return black for negative one
            }
            if (value < -1 || value > 1) {
                //console.error("Value must be between -1 and 1");
                value = Math.max(-1,Math.min(1,value)) ;  // clip the value to the interval [-1,1]
            }
            if (value === 0) {
                return 'white';  // Directly return white for zero
            } else if (value < 0) {
                // Scale the index for negative values (gray scale)
                const index = Math.round((-value) * (grayScaleArray.length - 1));
                return grayScaleArray[index];
            } else {
                // Scale the index for positive values (red scale)
                const index = Math.round(value * (redScaleArray.length - 1));
                return redScaleArray[index];
            }
        }

        

        ///////////////////////////////////////////// NETWORK FUNCTIONS ///////////////////////////////////////////

        // Initialize activations and weights
        function initializeNetwork(networkData, image) {
            global_networkData.nodes = [];
            global_networkData.weights = [];
            networkLayers.forEach((layerSize, layerIndex) => {
                let outputLayerIndex = networkLayers.length - 1;
                let inputLayerIndex = 0;
                // -- Initialize the activations for each layer
                let layerActivations = Array.from({ length: layerSize }, () => 0 );
                // for the first layer, set the activations to matrix values, concatenate the matrix
                if (layerIndex === inputLayerIndex) {
                    layerActivations = image.flat();
                }
                // -- Add the layer activations to the network data
                networkData.nodes.push(layerActivations);
                // Initialize the connection weights for each layer (between itself and the previous layer)
                // strore it in the networkData.weights[layerIndex]
                if (layerIndex !== inputLayerIndex) {
                    networkData.weights[layerIndex] = networkData.weights[layerIndex] || [];
                    let layerWeights = [];
                    let nodeWeights = [];
                    for (let nodeIndexTo = 0; nodeIndexTo < layerSize; nodeIndexTo++) {
                        if (weightUsage === 'random') {
                            if (layerIndex === outputLayerIndex) {
                                nodeWeights = Array.from({ length: networkLayers[layerIndex - 1] },getDuoRandomWeight);
                            } else {
                                nodeWeights = Array.from({ length: networkLayers[layerIndex - 1] },getTriRandomWeight);
                            }
                        } else if (weightUsage === 'optimal') {
                            nodeWeights = optimal_weights[layerIndex][nodeIndexTo];
                        } else if (weightUsage === 'zero') {
                            nodeWeights = Array.from({ length: networkLayers[layerIndex - 1] },() => 0);
                        }
                        layerWeights.push(nodeWeights);
                    }
                    networkData.weights[layerIndex] = layerWeights;
                }
            });
            // networkData.nodes.forEach((layer,layerIndex) => console.log('shape of nodes for layer',
            //                                                                 layerIndex,
            //                                                                 getShape(layer),
            //                                                                 isATensor(layer)));
            // networkData.weights.forEach((layer,layerIndex) => console.log('shape of weights for layer',
            //                                                                 layerIndex,getShape(layer),
            //                                                                 isATensor(layer)));
        }
        // forward pass function
        function forwardPass(networkData) {
            assertDefined(networkData, 'Network data is not defined');
            networkData.nodes.forEach((layer, layerIndex) => {
                if (layerIndex > 0 ) {
                    const prevLayer = networkData.nodes[layerIndex - 1];
                    const weights = networkData.weights[layerIndex];
                    layer.forEach((activation, nodeIndex) => {
                        let sum = 0;
                        prevLayer.forEach((prevActivation, prevNodeIndex) => {
                            sum += weights[nodeIndex][prevNodeIndex] * prevActivation;
                        });
                        let fun = layerFunctions[layerIndex];
                        layer[nodeIndex] = fun(sum);
                    });
                }
            });
        }

        ///////////////////////////////////////////// TRAINING FUNCTIONS ///////////////////////////////////////////

        ///// random functions

        // get random element of array
        function getRandomElement(arr) {
            return  arr[Math.floor(Math.random() * arr.length)];
        }
        // get count random elements of array
        function getRandomElements(arr, count=1) {
            let elements = [];
            for (let i = 0; i < count; i++) {
                elements.push(getRandomElement(arr));
            }
            return elements;
        }
        // Function to generate random value from -1, 0, 1
        function getTriRandomWeight() {
            return getRandomElement(tri_values);
        }
        // Function to generate random value from 0, 1
        function getDuoRandomWeight() {
            return getRandomElement(duo_values);
        }

        // cycle though the values, strict or random
        function cycleValue(value, values,strict=false) {
            let index = values.indexOf(value);
            // when strict is true, always cycle to the next value otherwise cycle 
            // to the next value with 50% probability
            if (strict || Math.random() >= 0.5) {
                // cycle to the next value
                return values[(index + 1) % values.length];
            } else {
                // cycle to the previous value
                return values[(index - 1 + values.length) % values.length];
            }
        }

        ///////////////////////////////////////////// DIAGNOSTICS ////////////////////////////////////////////

        // 
        function getError(image, networkData, trainingData) {
            assert(Array.isArray(image), 'type is not an array');
            assert(image.length === 2 && image[0].length === 2 && image[1].length === 2, 'Invalid image shape'); 
            const outputLayerIndex = networkData.nodes.length - 1;
            const outputLayer = networkData.nodes[outputLayerIndex];
            const target = trainingData.find(x => x[0].toString() === image.toString())[1];
            let error = 0;
            outputLayer.forEach((activation, nodeIndex) => {
                error += Math.pow(activation - target[nodeIndex], 2);
            });
            return error;
        }

        /////////////////////////////////////////// MATH FUNCTIONS ///////////////////////////////////////////

        function chunkArray(array, chunkSize) {
            return array.reduce((result, item, index) => {
                const chunkIndex = Math.floor(index / chunkSize);
        
                if (!result[chunkIndex]) {
                    result[chunkIndex] = []; // start a new chunk
                }
        
                result[chunkIndex].push(item);
        
                return result;
            }, []);
        }
        

        // clip function for interval [-1,1] f(x) = x for x in [-1,1] and f(x) = -1 or 1 for x < -1 or x > 1
        function clip(x) {
            if (x < -1) {
                return -1;
            } else if (x > 1) {
                return 1;
            } else {
                return x;
            }
        }
        // relu function for interval [-1,1] f(x) = x for x > 0 and f(x) = 0 for x < 0
        function relu(x) {
            return x > 0 ? (x>1? 1 : x) : 0;
        }
         // softmax on last layer
        function softmax(networkData) {
            // softmax on the last layer (without exp, just sum and divide by sum)
            const outputLayerIndex = networkData.nodes.length - 1;
            const outputLayer = networkData.nodes[outputLayerIndex];
            // const expSum = outputLayer.reduce((acc, val) => acc + Math.exp(val), 0);
            const justSum = outputLayer.reduce((acc, val) => acc + val, 0);
            outputLayer.forEach((activation, nodeIndex) => {
                // outputLayer[nodeIndex] = Math.exp(activation) / expSum;
                if (justSum === 0) {
                    outputLayer[nodeIndex] = 0;
                } else {
                    outputLayer[nodeIndex] = activation / justSum;
                }

            });
        }

        /////////////////////////////////////////// DRAWING FUNCTIONS ///////////////////////////////////////////
        // draw the 2x2 input matrix
        function drawMatrix(draw, networkData, trainingData, image, x, y) {
            const matrixGroup = draw.group();
            matrixGroup.move(x, y);
            image.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    const cellX = x+cellIndex * cellSize;
                    const cellY = y+rowIndex * cellSize;
                    const cellText = draw.text(cell)
                        .move(cellX + textHorLeftPadding, cellY)
                        .fill('white')
                        .font({ family: 'Helvetica', size: fontSize })
                        .hide();  // Initially hide the text
                    // <text x="{cellX + textHorLeftPadding}" y="{cellY}" fill="white" font-family="Helvetica" font-size="{fontSize}" visibility="hidden">
                    const cellBox = draw.rect(cellSize, cellSize)
                        .move(cellX, cellY)
                        .fill(cell === 1 ? 'black' : (cell === -1 ? 'darkred' : 'white'))
                        .addClass('clickable')
                        .stroke({ width: 1, color: 'gray' });
                    // mouseover effect for the cell
                    cellBox.mouseover(function() {
                        cellText.show();
                    }).mouseout(function() {
                        cellText.hide();
                    });
                    // cicle through the values on click
                    cellBox.click(function() {
                        //console.log(`Clicked on cell at row ${rowIndex} and column ${cellIndex}`);
                        const currentValue = image[rowIndex][cellIndex];
                        let newValue = -1 *currentValue;
                        //console.log(`Changing value from ${currentValue} to ${newValue}`);
                        image[rowIndex][cellIndex] = newValue;
                        networkData.nodes[0][rowIndex * 2 + cellIndex] = newValue;
                        // Update the fill color
                        this.fill(newValue === 1 ? 'black' : (newValue === -1 ? 'darkred' : 'white'));
                        // Update the text
                        cellText.text(newValue);
                        forwardPass(networkData);
                        softmax(networkData);
                        renderApp(draw, networkData, trainingData, image);
                    });
                    matrixGroup.add(cellBox).add(cellText);
                });
            });
            return matrixGroup;
        }
        function drawConnections(draw, networkData, trainingData, image) {
            assertDefined(draw, 'SVG draw object is not defined');
            assertDefined(networkData, 'Network data is not defined');
            assertDefined(networkData.nodes, 'Network nodes are not defined');
            assertDefined(networkData.weights, 'Network weights are not defined');
            assertDefined(trainingData, 'Training data is not defined');
            assertDefined(image, 'Image data is not defined');
            // Drawing lines between nodes
            networkData.nodes.forEach((layer, layerIndex) => {
                let prevLayer = [];
                let weights = [];
                if (layerIndex > 0) {
                    layer.forEach((activation, nodeIndex) => { 
                        prevLayer = networkData.nodes[layerIndex - 1];
                        weights = networkData.weights[layerIndex];
                        let weight = 0;
                        let fromX = 0;
                        let fromY = 0;
                        let toX = 0;
                        let toY = 0;
                        let line = null;
                        // create a group for the connections, with class like layer-1
                        // console.log("show layer ",layerIndex, showLayers[layerIndex])
                        const connectionsGroup = draw.group().addClass(`layer-${layerIndex}`);
                        if (showLayers[layerIndex]) {
                            connectionsGroup.show();
                        }
                        else {
                            connectionsGroup.hide();
                        }
                        prevLayer.forEach((prevActivation, prevNodeIndex) => {
                            weight = weights[nodeIndex][prevNodeIndex];
                            let lineColor = weight === 1 ? 'black' : (weight === -1 ? 'red' : 'lightgray');
                            // coodinates of the line
                            fromX = radius * 2 + (layerIndex - 1) * layerSpacing + networkLeftPadding;
                            fromY = (totalHeight - prevLayer.length * nodeSpacing) / 2 + prevNodeIndex * nodeSpacing+networkTopPadding;
                            toX = radius * 2 + layerIndex * layerSpacing+ networkLeftPadding;
                            toY = (totalHeight - layer.length * nodeSpacing) / 2 + nodeIndex * nodeSpacing+networkTopPadding;
                            // draw the line if the layer is visible
                            {//showLayers[layerIndex]) {
                                line = draw.line(fromX, fromY, toX, toY)
                                    .stroke({ width: 3, color: lineColor })
                                    .addClass('clickable');
                            }
                            connectionsGroup.add(line);
                            // Change network weights on click
                            line.click(function() {
                                //console.log(`Clicked on line from node ${prevNodeIndex} in layer ${layerIndex - 1} to node ${nodeIndex} in layer ${layerIndex}`);
                                const currentWeight = networkData.weights[layerIndex][nodeIndex][prevNodeIndex];
                                const newWeight = cycleValue(currentWeight,tri_values,true);
                                console.log(`Changing weight from ${currentWeight} to ${newWeight}`);
                                networkData.weights[layerIndex][nodeIndex][prevNodeIndex] = newWeight;
                                // Update the line color
                                this.stroke(newWeight === 1 ? 'black' : (newWeight === -1 ? 'red' : 'lightgray'));
                                // Update
                                forwardPass(networkData);
                                softmax(networkData);
                                renderApp(draw, networkData, trainingData, image);

                            });

                        });
                    
                    });
                }
            });
        }
        function drawNodes(draw, networkData, trainingData, image) {
            // Drawing nodes and applying colors based on activation
            networkData.nodes.forEach((layer, layerIndex) => {
                let isLastLayer = layerIndex === networkData.nodes.length - 1;
                const connectionsGroup = draw.group().addClass(`layer-${layerIndex}`);
                layer.forEach((activation, nodeIndex) => {
                    // Draw nodes and apply colors based on activation
                    const centerX = radius * 2 + layerIndex * layerSpacing+ networkLeftPadding;
                    const centerY = (totalHeight - layer.length * nodeSpacing) / 2 + nodeIndex * nodeSpacing + networkTopPadding;
                    const boxX = centerX - boxWidth / 2;
                    const boxY = centerY - boxHeight / 2;
                    const textY = boxY - boxHeight / 2 - fontSize;
                    // let fillColor = activation === 1 ? 'darkred' : (activation === -1 ? 'black' : 'white');
                    let fillColor = mapFloatToColor(activation, grayColors, redColors);
                    if (isLastLayer) {
                        fillColor = mapFloatToGrayColor(activation, grayScaleArray);
                    }
                    const circle = draw.circle(radius * 2)
                        .attr({
                            fill: fillColor,
                            stroke: '#000',
                            'stroke-width': 2
                        })
                        .center(centerX, centerY);
                    // if not output layer, add the circle to the connections group
                    if (!isLastLayer) {
                        connectionsGroup.add(circle);
                    }
                    if (showLayers[layerIndex]) {
                        connectionsGroup.show();
                    }
                    else {
                        connectionsGroup.hide();
                    }
                    // label text above the node
                    const visibility = showLabels || layerIndex === 0 ? 'visible' : 'hidden';
                    const labelText = createSVGText(networkNodeLabels[layerIndex][nodeIndex],centerX,centerY - 2*radius,
                        {family: 'Helvetica', size: fontSize, color: 'black', visibility: visibility, anchor: 'middle'});
                    // svg.js has difficulties to get text right, needed sometimes a reload to show the text at the right position, so I used the code above
                    // const labelText = draw.text(networkNodeLabels[layerIndex][nodeIndex])
                    //     .move(centerX, centerY - 2*radius - 2*fontSize)
                    //     .fill('black')
                    //     .font({ family: 'Helvetica', size: fontSize, anchor: 'middle'});

                    // //draw.add(cellText1);
                    // if (showLabels || layerIndex == 0) {
                    //     labelText.show();
                    // } else {
                    //     labelText.hide();
                    // }
                    if(!isLastLayer) {
                        connectionsGroup.add(labelText);

                    }
                    
                    if (layerIndex !== 0) {
                        labelText.setAttribute('class', ''); // addClass('label');
                    }

                    // text box
                    const activationText = draw.text(activation)
                        .move(boxX + textHorLeftPadding, textY)
                        .fill('white')
                        .font({ family: 'Helvetica', size: 12 })
                        .attr({ 'text-anchor': 'left' })
                        .hide();  // Initially hide the text
                    

                    // Hover effect for nodes
                    circle.mouseover(function() {
                        this.fill({ color: 'blue' });
                        activationText.show();  // Show activation text below the node
                    }).mouseout(function() {
                        this.fill({ color: fillColor });
                        activationText.hide();  // Hide activation text
                    });
                });
            });
            // draw the output labels right to output layer
            const labelFontSize = 18;
            const outputLayerIndex = networkData.nodes.length - 1;
            const outputLayer = networkData.nodes[outputLayerIndex];

            outputLayer.forEach((activation, nodeIndex) => {
                const centerX = radius * 2 + outputLayerIndex * layerSpacing + networkLeftPadding;
                const centerY = (totalHeight - outputLayer.length * nodeSpacing) / 2 + nodeIndex * nodeSpacing;
                const textX = centerX + radius * 2;
                const textY = centerY + fontSize ;

                draw.text(outputLabels[nodeIndex])
                    .move(textX, textY)
                    .font({ family: 'Helvetica', size: labelFontSize, anchor: 'left', weight: 'bold' });
            });
        }
        function drawVisibilityButtons(draw){
            // Draw the visibility buttons
            let onShowLayerClicked = (buttonText, layerNr) => {
                showLayers[layerNr] = !showLayers[layerNr];
                draw.find(`.layer-${layerNr}`).forEach(function(element) {
                    showLayers[layerNr] ? element.show() : element.hide();
                });
                buttonText.text(`${showLayers[layerNr]?"hide":"show"} ${layerNr}`);
            };
            showLayers.forEach((showLayer,layerIndex) => {
                if (layerIndex > 0) {
                    let x = 10 + (layerIndex-1)*70, y = 10;
                    rectWithText(draw, x, y, 60, 30, () => `${showLayer?"hide":"show"} ${layerIndex}`,{
                        callback: onShowLayerClicked,
                        args: [layerIndex]
                    });
                }});
        }
        function drawShowLabelsButton(draw){
            // Draw the button to toggle the labels
            let onShowLabelsClicked = () => {
                console.log('Clicked on the ShowLabels button');
                showLabels = !showLabels;
                draw.find('.label').forEach(function(element) {
                    if (showLabels) {
                        element.show();
                    } else {
                        element.hide();
                    }
                });
                };
            rectWithText(draw, 400, 10, 100, 30, () => `${showLabels?"hide":"show"} labels`,{
                rectFill: 'lightblue',
                callback: onShowLabelsClicked
            });
        }
        function drawWeightUsageButton(draw){
            // Use different weights for the network
            let onWeightUsageClicked = (buttonText) =>{
                console.log('Clicked on the button');
                weightUsage = cycleValue(weightUsage, ['random', 'optimal', 'zero'],true);
                buttonText.text(weightUsage);
                let images = getRandomElements(global_trainingData.slice(0,8),1);
                let testImage = chunkArray(images[0][0],2);
                // deep copy of optimal weights
                initializeNetwork(global_networkData, testImage);
                forwardPass(global_networkData);
                softmax(global_networkData);
                renderApp(draw, global_networkData, global_trainingData, testImage);
            };
            // Draw the button to toggle the weight usage
            rectWithText(draw, 510, 10, 100, 30, () => weightUsage,{
                rectFill: 'lightblue',
                callback: onWeightUsageClicked
            });
        }
        function drawError(draw,networkData, trainingData,image) {
            draw.text(`Error: ${getError(image, networkData,trainingData)}`)
                .move(300, 550)
                .fill('black')
                .font({ family: 'Helvetica', size: 48 })
                .stroke('black');
        }
        // Calculate centering offset for each layer based on the maximum layer size
        const maxNodes = Math.max(...networkLayers); // Find the maximum number of nodes in any layer
        const totalHeight = maxNodes * nodeSpacing; // Total height needed to center the largest layer

        // Render the network visualization
        function renderApp(draw, networkData, trainingData, image) {
            assertDefined(draw, 'SVG draw object is not defined');
            // Clear the existing network
            draw.clear();
            // Draw the connections
            drawConnections(draw, networkData, trainingData, image);
            // Draw the nodes
            drawNodes(draw, networkData);
            // Draw the matrix
            drawMatrix(draw, networkData, trainingData, image, 0, 250);
            // Draw the buttons
            drawVisibilityButtons(draw);
            drawShowLabelsButton(draw);
            drawWeightUsageButton(draw);
            // Draw the corners
            origin(draw, 0, 0);
            origin(draw, 1200, 620);
            // Draw the error
            drawError(draw,networkData, trainingData, image);
         }

        // Initialize and render the network
        
        function run(testCase){
            let testImage = chunkArray(testCase[0],2);
            initializeNetwork(global_networkData, testImage);
            forwardPass(global_networkData);
            softmax(global_networkData);
            console.log('network calculated');
            renderApp(global_draw, global_networkData, global_trainingData, testImage);
        }
        let images = getRandomElements(global_trainingData.slice(0,8),1);
        run(images[0]);

    }

    // run a function on all div elements with type=fun.name
    function runFunction(fun) {
        console.log(`run ${fun.name}`);
        const elements = document.querySelectorAll(`div[type=${fun.name}]`);

        elements.forEach(element => {
            console.log(`execute ${fun.name} at element: ${element.id}`);
            fun(element);
        });
    }

    /////////////////////////////////////////////////////////////////////////////////////

    // create an EventSource object for the server-sent events
    const eventSource$1 = new EventSource('events');

    /////////////////////////////////////////////////////////////////////////////////////

    // display the IP and socket number received from the server at the ipSocketElement
    async function showIPSocket(ipSocketElement) {
        const ipSocket = await getIPSocket();
        ipSocketElement.innerHTML = `http://${ipSocket.ip}:${ipSocket.socketNr}/`;
        }

    // depending on browser, go full screen
    function goFullScreen() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen();
        }
    }

    // create the team visualisation and append it to the teamElement
    function teamCollection(teamElement) {
        // Create the <div> element with id="svg-team"
        const svgTeamDiv = document.createElement('div');
        svgTeamDiv.id = 'svg-team';

        // Create the <div> element with class="toast-container" and id="toast-container"
        const toastContainerDiv = document.createElement('div');
        toastContainerDiv.className = 'toast-container';
        toastContainerDiv.id = 'toast-container';


        // Alternatively, you can append them to a specific parent element
        teamElement.appendChild(svgTeamDiv);
        teamElement.appendChild(toastContainerDiv);
        createTeam();
    }

    // create the mustererkennung neural net visualization and append it to the meElement
    function mustererkennung(meElement) {
        // Create the <div> element with id="muster-team"
        const musterTeamDiv = document.createElement('div');
        musterTeamDiv.id = 'muster-team';

        meElement.appendChild(musterTeamDiv);
        createMustererkennung();
    }

    /////////////////////////////////////////////////////////////////////////////////////

    // create a input field, append it to the inputElement and allow submitting the form on return
    function inputField(inputElement) {
        // Create the form element
        const form = document.createElement('form');

        // Create the input element
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = 'input';
        inputField.style.width = '300px';

        // Append the input field to the form
        form.appendChild(inputField);

        // Append the form to the body (or any other parent element)
        inputElement.appendChild(form);

        // regoster the submitOnReturn function to the input field
        addSubmitOnReturn(inputField, inputElement.id);
    }
    // collect the input field value and send it to the server
    async function inputCollection(collectionElement){
        console.log('inputCollection', collectionElement);
        // get data ref attribute
        const qid = collectionElement.getAttribute('data-ref');
        console.log('qid', qid);
        const argConfig = JSON.parse(collectionElement.getAttribute('data-argConfig'));
        await resultsBoard(collectionElement, argConfig);
    }

    /////////////////////////////////////////////////////////////////////////////////////

    // create a likert scale, append it to the likertElement
    function pollField(pollElement) {
        likertField(pollElement);
    }

    // show the percentage of responses to the likert scale
    async function pollPercentage(percentageElement){
        // create button
        showPercentage(percentageElement);
        
    }

    // register the service, when the user issues a click or keydown event, 
    // the slide number is reported to the console (TBD: and SSE)
    function registerReportSlideNumber() {
        function getSlideNumber() {
            // Query the DOM for the slide number elements
            const slideNumberElement = document.querySelector('.slide-number-a');
            const totalSlidesElement = document.querySelector('.slide-number-b');

            if (slideNumberElement && totalSlidesElement) {
            const currentSlide = slideNumberElement.textContent;
            const totalSlides = totalSlidesElement.textContent;
            console.log(`Current slide: ${currentSlide} of ${totalSlides}`);
            return { currentSlide, totalSlides };
            } else {
            console.log('Slide number element not found');
            return null;
            }
        }

        // Detect keydown event (like Page Down or Arrow keys)
        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'PageDown' || event.key === 'PageUp') {
            getSlideNumber();
            }
        });

        // Detect click events (like clicking on navigation arrows)
        document.addEventListener('click', function(event) {
            getSlideNumber();
        });
        }

    // src/main.js

    console.log('main.js loaded');


    // run the functions when the DOM is loaded at every div element with type=fun.name
    // this makes the <div type="fun.name"> tag in your HTML act as a function call
    document.addEventListener('DOMContentLoaded', () => {
        console.log('populate divs which are bound to functions');
        runFunction(showIPSocket);
        runFunction(goFullScreen);
        runFunction(teamCollection);
        runFunction(inputField);
        runFunction(inputCollection);
        runFunction(pollField);
        runFunction(pollPercentage);
        runFunction(mustererkennung);
    });

    // register reportSlideNumber to be called when the DOM is loaded
    document.addEventListener('DOMContentLoaded', registerReportSlideNumber);

    // export the functions/variables to the global scope
    window.eventSource = eventSource$1; // variable for the EventSource object
    window.goFullScreen = goFullScreen; // function to go full screen

})();

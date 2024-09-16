import {origin, rectWithText,createSVGText} from './draw.js';

console.log("loaded mustererkennung.js")


export function createMustererkennung(){


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
    // configuration for the buttons
    const buttonX = 1150;
    const buttonY = 0;
    const buttonWidth = 50;
    const buttonHeight = 20;
    const bottonFontSize = 12;
    const buttonTextX = buttonX + buttonWidth/2;
    const buttonTextY = buttonY-buttonHeight-bottonFontSize/2;
    const deltaY = 30;
    // configuration for the matrix
    const cellSize = 50;

    const optimal_weights = [[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
                             [[1,0,1,0],[0,1,0,1],[1,0,-1,0],[0,1,0,-1]],
                             [[1,1,0,0],[1,-1,0,0],[0,0,1,1],[0,0,1,-1]],
                             [[1,0,0,0],[-1,0,0,0],[0,1,0,0],[0,-1,0,0],[0,0,1,0],[0,0,-1,0],[0,0,0,1],[0,0,0,-1]],
                             [[1,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0],[0,0,0,0,0,0,1,1]]];

    ///////////////////////////////////////////// SYSTEM FUNCTIONS ///////////////////////////////////////////

    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

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
                let nodeWeights = []
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

    function update_weights(networkData, weights) {
        networkData.weights = weights;
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

    //// simulated annealing functions

    // cycle weights in the network
    function cycleRandomConnectionWeights(networkData,count=1){ 
        let outputLayerIndex = networkData.nodes.length - 1;
        let layerSize = 0;
        let prevLayerSize = 0;
        for (let i = 0; i < count; i++) {
            networkData.weights.forEach((layer, layerIndex) => {
                layerSize = layer[0].length;
                //console.log(layerIndex,layerSize);
                if (layerIndex > 0 ) {
                    let randomConnection = [Math.floor(Math.random() * layerSize),Math.floor(Math.random() * prevLayerSize)]; 
                    //console.log('Cycling random connection in', layerIndex, randomConnection);
                    weight = networkData.weights[layerIndex][randomConnection[0]][randomConnection[1]];
                    if (layerIndex === outputLayerIndex) {
                        newWeight = cycleValue(weight,duo_values);
                    } else {
                        newWeight = cycleValue(weight,tri_values);
                    }
                    //console.log(`Changing weight from ${weight} to ${newWeight}`);
                    //networkData.weights[layerIndex][0][randomConnection[0]][randomConnection[1]] = newWeight;
                }
                prevLayerSize = layerSize;
            })

        }
    };

    // optimize weights in the network via trying to minimize the error by changing the weights
    function tryToOptimizeWeights(networkData, trainingData){
        // store networkdata via a deep copy
        let networkDataCopy = JSON.parse(JSON.stringify(networkData));
        // store current error
        let currentError = getError(image, networkData, trainingData);
        // get network weights and nodes activations
        cycleRandomConnectionWeights(networkDataCopy,count=1);
        // try new weights with 4 random training examples
        let images = getRandomElements(trainingData,4);
        let newError = 0;
        images.forEach(image => {
            Object.assign(networkDataCopy.nodes[0], image.flat());
            forwardPass(networkDataCopy);
            softmax(networkDataCopy);
            newError += getError(image, networkDataCopy, trainingData);
        });

        // if new error is smaller, keep the new weights
        if (newError < currentError) {
            console.log('Optimization successful: current, new error',currentError,newError);
            Object.assign(networkData, networkDataCopy);
        } else {
            console.log('Optimization failed: current, new error',currentError,newError);
            Object.assign(networkData, networkDataCopy);
        }
    }

    ///////////////////////////////////////////// DIAGNOSTICS ////////////////////////////////////////////

    // 
    function getError(image, networkData, trainingData) {
        assert(Array.isArray(image), 'type is not an array')
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

    // function to count the number of crossings in the network
    function getCrossings(networkData) {
        let crossings = 0;
        networkData.nodes.forEach((layer, layerIndex) => {
            if (layerIndex > 0 ) {
                const prevLayer = networkData.nodes[layerIndex - 1];
                const weights = networkData.weights[layerIndex];
                last_ixs = new Set([]);
                weights.forEach( (prevs, nodeIndex) => {
                    // indexes where the abs of weights are 1 
                    ixs = prevs.map((x,i) => Math.abs(x) === 1 ? i : -1).filter(x => x !== -1);
                    last_ixs = new Set([...last_ixs, ...ixs]);
                    crossings += ixs.filter(x => last_ixs.has(x)).length;
                });
                //console.log(layerIndex,crossings);
            }
        });
        return crossings;
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

    // get the shape of the array like in pytorch
    function getShape(arr) {
        if (!Array.isArray(arr)) {
            return [];
        }
        let shape = [];
        let tempArr = arr;
        while (Array.isArray(tempArr)) {
            shape.push(tempArr.length);
            tempArr = tempArr[0];
        }
        return shape;
    }
    
    function isATensor(arr) {
        if (!Array.isArray(arr)) {
            return false; // If it's not an array, skip it
        }
    
        let isIrregular = false;
    
        function checkLengths(subArray, expectedLength) {
            if (!Array.isArray(subArray)) {
                return false; // If it's not an array, skip it.
            }
            if (subArray.length !== expectedLength) {
                isIrregular = true;
            }
            subArray.forEach(item => checkLengths(item, subArray[0].length));
        }
    
        arr.forEach(subArray => {
            if (Array.isArray(subArray)) {
                checkLengths(subArray, subArray.length);
            }
        });
    
        return !isIrregular;
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
                    let lineColor = 'lightgray';
                    let fromX = 0;
                    let fromY = 0;
                    let toX = 0;
                    let toY = 0;
                    let midX = 0;
                    let midY = 0;
                    let textY = 0;
                    let line = null;
                    let weightTextBox = null;
                    let weightText = null;
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
                        // Calculate the midpoints
                        midX = (fromX + toX) / 2;
                        midY = (fromY + toY) / 2;
                        // -- Y coordinates for the text box and text
                        textY = midY - boxHeight / 2 - fontSize;
                        // draw the line if the layer is visible
                        if (true){//showLayers[layerIndex]) {
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
        }
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
            }
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
        }
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
        drawNodes(draw, networkData, trainingData, image);
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


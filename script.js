let nyVideoDivs = [];
let videoDivData = [];

function moveVideosToNYDiv() {
    // get target divs
    let videoElements = document.querySelectorAll('video');

    videoElements.forEach((videoElement, index) => {
        // remove min-height setting
        videoElement.style.minHeight = '0px';

        videoDivData.push({
            'originParent': videoElement.parentNode.parentNode,
            'videoWrapper': videoElement.parentNode
        });
    });

    let nyMainDiv = document.querySelector('#newyellow-div');
    for (let i = 0; i < videoDivData.length; i++) {
        let newDiv = document.createElement('div');
        newDiv.id = 'camera-' + i;
        newDiv.className = 'camScreen';
        nyMainDiv.appendChild(newDiv);

        // move to new node
        newDiv.appendChild(videoDivData[i].videoWrapper);
        nyVideoDivs.push(newDiv);
    }

    document.querySelector('body').appendChild(nyMainDiv);
}

function setMainCam(index) {
    let targetId = 'camera-' + index;

    let mainDivRatio = 96;
    let subDivRatio = 14;

    for (let i = 0; i < nyVideoDivs.length; i++) {
        let targetElement = nyVideoDivs[i];
        let videoElement = targetElement.querySelector('video');
        let vWidth = videoElement.videoWidth;
        let vHeight = videoElement.videoHeight;
        let vRatio = vWidth / vHeight;

        console.log(`vWidth: ${vWidth}, vHeight: ${vHeight}, vRatio: ${vRatio}`);

        if (targetElement.id == targetId)
        {
            document.querySelector('#newyellow-div .main-cam').appendChild(targetElement);
            // targetElement.classList.add('main');
            // targetElement.style.width = `${mainDivRatio}vw`;
            // targetElement.style.height = `${mainDivRatio / vRatio}vw`;
        }
        else
        {
            document.querySelector('#newyellow-div .sub-cams').appendChild(targetElement);
            // targetElement.classList.add('sub');
            // targetElement.style.width = `${subDivRatio}vw`;
            // targetElement.style.height = `${subDivRatio / vRatio}vw`;
        }
    }
}

function setupButtons () {
    let videoCount = nyVideoDivs.length;
    let controlPanelDiv = document.querySelector('#newyellow-control');

    for(let i=0; i<videoCount; i++) {
        let buttonDiv = document.createElement('div');
        buttonDiv.id = 'ny-switch-button-' + i;
        buttonDiv.className = 'NYButton';
        buttonDiv.innerHTML = i;

        buttonDiv.onclick = () => {
            setMainCam(i);
        };

        controlPanelDiv.appendChild(buttonDiv);
    }

    // add close button
    let closeButton = document.createElement('div');
    closeButton.id = 'ny-close-button';
    closeButton.className = 'NYButton';
    closeButton.innerHTML = 'X';

    // special color
    closeButton.style.backgroundColor = '#991122';
    closeButton.style.color = '#FFFFFF';

    closeButton.onclick = () => {
        cancelInjection();
    };

    controlPanelDiv.appendChild(closeButton);
}

function cancelInjection () {
    for(let i=0; i< nyVideoDivs.length; i++) {
        console.log(videoDivData);
        videoDivData[i].originParent.appendChild(videoDivData[i].videoWrapper);
    }

    document.querySelector('#newyellow-div').remove();
}

// delayed start
setTimeout(() => {
    moveVideosToNYDiv();
    setMainCam(0);
    setupButtons();
}, 1000);
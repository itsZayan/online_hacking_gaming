// Expose initialization function globally
window.initHackerTerminal = function() {
    console.log('Initializing hacker terminal...');
    
    // Create terminal overlay structure
    createTerminalOverlay();
    
    // Initialize terminal when page loads
    initTerminal();
    
    // Start matrix canvas
    startMatrix();
    
    console.log('Terminal initialization complete');
};

// Wait for DOM content loaded but don't auto-initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded, waiting for interaction to start terminal');
    // Now waiting for click to start
});

// Create terminal overlay DOM structure
function createTerminalOverlay() {
    // Create terminal container
    const terminalIntro = document.createElement('div');
    terminalIntro.id = 'terminal-intro';
    terminalIntro.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        z-index: 9999;
        font-family: 'Share Tech Mono', monospace;
        color: #0f0;
        padding: 20px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    `;
    
    // Create matrix canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        z-index: -1;
    `;
    
    // Create scanline effect
    const scanline = document.createElement('div');
    scanline.className = 'scanline';
    scanline.style.cssText = `
        width: 100%;
        height: 4px;
        position: absolute;
        background: rgba(0, 255, 0, 0.3);
        opacity: 0.3;
        pointer-events: none;
        animation: scanline 6s linear infinite;
    `;
    
    // Create terminal content container
    const terminalContent = document.createElement('div');
    terminalContent.id = 'terminal-content';
    terminalContent.style.cssText = `
        overflow-y: auto;
        flex-grow: 1;
    `;
    
    // Create continue button
    const continueBtn = document.createElement('button');
    continueBtn.id = 'continue-btn';
    continueBtn.textContent = 'ACCESS GRANTED [ENTER]';
    continueBtn.style.cssText = `
        position: absolute;
        bottom: 20px;
        right: 20px;
        background-color: transparent;
        color: #0f0;
        border: 1px solid #0f0;
        padding: 10px 20px;
        font-family: 'Share Tech Mono', monospace;
        cursor: pointer;
        display: none;
        transition: background-color 0.3s;
    `;
    
    // Add styles for terminal elements
    const style = document.createElement('style');
    style.textContent = `
        .terminal-line {
            margin: 0;
            line-height: 1.5;
            white-space: nowrap;
            overflow: hidden;
            position: relative;
        }
        
        .typing {
            animation: typing-effect 1.5s steps(30, end);
        }
        
        .cursor::after {
            content: "_";
            opacity: 1;
            animation: blink-cursor 0.7s infinite;
        }
        
        .success { color: #0f0; }
        .error { color: #f00; }
        .warning { color: #ff0; }
        .info { color: #0ff; }
        
        @keyframes typing-effect {
            from { width: 0 }
            to { width: 100% }
        }
        
        @keyframes blink-cursor {
            0%, 100% { opacity: 1 }
            50% { opacity: 0 }
        }
        
        @keyframes scanline {
            0% { top: 0%; }
            100% { top: 100%; }
        }
        
        .glitch {
            position: relative;
            animation: glitch-skew 1s infinite linear alternate-reverse;
        }
        
        .glitch::before,
        .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            clip: rect(44px, 450px, 56px, 0);
        }
        
        .glitch::before {
            left: 2px;
            text-shadow: -2px 0 #ff00ff;
            animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        
        .glitch::after {
            left: -2px;
            text-shadow: -2px 0 #00ffff;
            animation: glitch-anim2 1s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
            0% { clip: rect(31px, 9999px, 14px, 0); transform: skew(0.58deg); }
            5% { clip: rect(67px, 9999px, 75px, 0); transform: skew(0.34deg); }
            10% { clip: rect(84px, 9999px, 85px, 0); transform: skew(0.3deg); }
            15% { clip: rect(17px, 9999px, 37px, 0); transform: skew(0.94deg); }
            20% { clip: rect(33px, 9999px, 91px, 0); transform: skew(0.41deg); }
            25% { clip: rect(7px, 9999px, 34px, 0); transform: skew(0.67deg); }
            30% { clip: rect(38px, 9999px, 19px, 0); transform: skew(0.93deg); }
            35% { clip: rect(82px, 9999px, 37px, 0); transform: skew(0.58deg); }
            40% { clip: rect(96px, 9999px, 59px, 0); transform: skew(0.57deg); }
            45% { clip: rect(25px, 9999px, 49px, 0); transform: skew(0.3deg); }
            50% { clip: rect(75px, 9999px, 100px, 0); transform: skew(0.31deg); }
            55% { clip: rect(22px, 9999px, 33px, 0); transform: skew(0.59deg); }
            60% { clip: rect(80px, 9999px, 86px, 0); transform: skew(0.42deg); }
            65% { clip: rect(57px, 9999px, 32px, 0); transform: skew(0.58deg); }
            70% { clip: rect(83px, 9999px, 14px, 0); transform: skew(0.68deg); }
            75% { clip: rect(23px, 9999px, 6px, 0); transform: skew(0.33deg); }
            80% { clip: rect(75px, 9999px, 85px, 0); transform: skew(0.7deg); }
            85% { clip: rect(40px, 9999px, 30px, 0); transform: skew(0.84deg); }
            90% { clip: rect(65px, 9999px, 96px, 0); transform: skew(0.28deg); }
            95% { clip: rect(5px, 9999px, 79px, 0); transform: skew(0.61deg); }
            100% { clip: rect(7px, 9999px, 61px, 0); transform: skew(0.69deg); }
        }
        
        @keyframes glitch-anim2 {
            0% { clip: rect(21px, 9999px, 94px, 0); transform: skew(0.48deg); }
            5% { clip: rect(87px, 9999px, 65px, 0); transform: skew(0.94deg); }
            10% { clip: rect(84px, 9999px, 75px, 0); transform: skew(0.5deg); }
            15% { clip: rect(17px, 9999px, 17px, 0); transform: skew(0.64deg); }
            20% { clip: rect(73px, 9999px, 11px, 0); transform: skew(0.61deg); }
            25% { clip: rect(77px, 9999px, 64px, 0); transform: skew(0.57deg); }
            30% { clip: rect(28px, 9999px, 79px, 0); transform: skew(0.53deg); }
            35% { clip: rect(52px, 9999px, 77px, 0); transform: skew(0.48deg); }
            40% { clip: rect(96px, 9999px, 79px, 0); transform: skew(0.27deg); }
            45% { clip: rect(35px, 9999px, 39px, 0); transform: skew(0.8deg); }
            50% { clip: rect(95px, 9999px, 60px, 0); transform: skew(0.91deg); }
            55% { clip: rect(42px, 9999px, 23px, 0); transform: skew(0.69deg); }
            60% { clip: rect(50px, 9999px, 86px, 0); transform: skew(0.32deg); }
            65% { clip: rect(77px, 9999px, 42px, 0); transform: skew(0.68deg); }
            70% { clip: rect(23px, 9999px, 54px, 0); transform: skew(0.38deg); }
            75% { clip: rect(13px, 9999px, 36px, 0); transform: skew(0.73deg); }
            80% { clip: rect(25px, 9999px, 65px, 0); transform: skew(0.6deg); }
            85% { clip: rect(40px, 9999px, 90px, 0); transform: skew(0.54deg); }
            90% { clip: rect(65px, 9999px, 26px, 0); transform: skew(0.58deg); }
            95% { clip: rect(5px, 9999px, 79px, 0); transform: skew(0.21deg); }
            100% { clip: rect(17px, 9999px, 11px, 0); transform: skew(0.29deg); }
        }
        
        @keyframes glitch-skew {
            0% { transform: skew(0deg); }
            10% { transform: skew(-1deg); }
            20% { transform: skew(2deg); }
            30% { transform: skew(-1deg); }
            40% { transform: skew(2deg); }
            50% { transform: skew(0deg); }
            60% { transform: skew(0deg); }
            70% { transform: skew(-1deg); }
            80% { transform: skew(1deg); }
            90% { transform: skew(-1deg); }
            100% { transform: skew(0deg); }
        }
        
        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: #111;
            margin: 10px 0;
            border: 1px solid #0f0;
            position: relative;
        }
        
        .progress-bar-fill {
            height: 100%;
            width: 0;
            background-color: #0f0;
            transition: width 0.5s;
        }
        
        .progress-bar-text {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
            line-height: 20px;
            color: #fff;
        }
        
        #continue-btn:hover {
            background-color: rgba(0, 255, 0, 0.1);
            box-shadow: 0 0 10px #0f0;
        }
        
        .blink {
            animation: blink-animation 1s steps(5, start) infinite;
        }
        
        @keyframes blink-animation {
            to {
                background-color: rgba(0, 255, 0, 0.2);
                box-shadow: 0 0 15px #0f0;
            }
        }
    `;
    
    // Append everything to terminal
    terminalIntro.appendChild(style);
    terminalIntro.appendChild(canvas);
    terminalIntro.appendChild(scanline);
    terminalIntro.appendChild(terminalContent);
    terminalIntro.appendChild(continueBtn);
    
    // Add to document body
    document.body.insertBefore(terminalIntro, document.body.firstChild);
}

// Terminal initialization function
function initTerminal() {
    // Create audio context and sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Function to play basic beep sounds
    function playBeep(frequency, duration, volume) {
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = frequency;
            
            // Add smooth fade-in/fade-out to reduce harshness
            gainNode.gain.value = 0;
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.005);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration/1000 - 0.005);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            
            setTimeout(function() {
                oscillator.stop();
            }, duration);
            
            return true;
        } catch (e) {
            console.error('Failed to play beep:', e);
            return false;
        }
    }
    
    // Create a more realistic typing sound
    function playTypingSound() {
        // Random frequency between 80-150 Hz for a gentle keyboard tap
        const frequency = 80 + Math.random() * 70;
        // Very short duration for authentic keyboard clicks
        const duration = 3 + Math.random() * 8;
        // Even lower volume for a subtle effect
        playBeep(frequency, duration, 0.01);
    }
    
    // Create a loading sound effect
    function playLoadingSound() {
        // Play a series of subtle loading sounds
        const baseFreq = 300;
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                playBeep(baseFreq + (i * 30), 40, 0.03);
            }, i * 100);
        }
    }
    
    // Create a more cinematic access granted sound
    function playAccessGrantedSound() {
        // Play a series of ascending tones
        playBeep(300, 80, 0.03);
        setTimeout(() => playBeep(400, 80, 0.03), 100);
        setTimeout(() => playBeep(500, 80, 0.03), 200);
        setTimeout(() => playBeep(600, 100, 0.04), 300);
        setTimeout(() => playBeep(800, 150, 0.05), 450);
        setTimeout(() => playBeep(1000, 200, 0.04), 650);
    }
    
    // Simple sound functions
    const sounds = {
        typingSound: playTypingSound,
        // Soft low beep
        beepSound: () => playBeep(350, 60, 0.03),
        // Higher pitch for alerts
        beepHigh: () => playBeep(600, 40, 0.02),
        // Lower pitch for status updates
        beepLow: () => playBeep(250, 70, 0.02),
        // UI interaction sound
        accessSound: () => {
            playBeep(400, 80, 0.03);
            setTimeout(() => playBeep(600, 40, 0.02), 100);
        },
        // Error sound - descending tone
        errorSound: () => {
            playBeep(400, 60, 0.03);
            setTimeout(() => playBeep(300, 60, 0.03), 80);
            setTimeout(() => playBeep(200, 80, 0.04), 160);
        },
        // Success sound - ascending tone
        successSound: () => {
            playBeep(350, 40, 0.02);
            setTimeout(() => playBeep(500, 50, 0.03), 60);
            setTimeout(() => playBeep(650, 60, 0.02), 130);
        },
        // Alert sound - double beep
        alertSound: () => {
            playBeep(500, 50, 0.02);
            setTimeout(() => playBeep(500, 50, 0.03), 120);
        },
        // Access granted - special sequence
        accessGranted: playAccessGrantedSound,
        // Loading sound - repeated pulses
        loadingSound: playLoadingSound
    };
    
    const terminal = document.getElementById('terminal-content');
    const continueBtn = document.getElementById('continue-btn');
    
    // Ensure all audio elements are correctly loaded
    const allSounds = [
        sounds.typingSound, sounds.beepSound, sounds.beepHigh, sounds.beepLow, sounds.accessSound, 
        sounds.errorSound, sounds.successSound, sounds.alertSound
    ];
    
    // Preload and set volume for all sounds
    allSounds.forEach(sound => {
        if (sound) {
            sound.preload = 'auto';
            // Set default volume
            sound.volume = 0.2;
            
            // Add error handling for missing sound files
            sound.onerror = function() {
                console.warn(`Sound file could not be loaded: ${sound.id}`);
                // Create a fallback Audio object without a source
                // This prevents errors when trying to play the sound
                const index = allSounds.indexOf(sound);
                if (index !== -1) {
                    allSounds[index] = new Audio();
                }
            };
        }
    });
    
    // Custom volumes
    if (sounds.typingSound) sounds.typingSound.volume = 0.15;
    
    // Force a user interaction before playing sounds
    const playSounds = () => {
        // Play system startup sound
        if (sounds.beepSound) {
            sounds.beepSound.play().catch(e => console.log('Audio play failed: ' + e));
        }
        
        // Remove event listener after first interaction
        document.removeEventListener('click', playSounds);
    };
    
    // Add click event to start sounds
    document.addEventListener('click', playSounds);
    
    // Force audio context initialization
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    // Random keypress sounds function
    function playRandomKeypress() {
        const keypresses = [sounds.beepLow, sounds.beepHigh];
        const randomKeypress = keypresses[Math.floor(Math.random() * keypresses.length)];
        if (randomKeypress) {
            randomKeypress.volume = 0.1;
            randomKeypress.currentTime = 0;
            randomKeypress.play().catch(e => {});
        }
    }
    
    // Commands and responses to simulate
    const terminalSequence = [
        { text: "INITIALIZING SYSTEM...", type: "info", delay: 500, sound: sounds.beepLow },
        { text: "ESTABLISHING CONNECTION...", type: "info", delay: 1000 },
        { text: "CONNECTING TO SECURE SERVER: gaming.neotech.net", type: "command", delay: 800, sound: sounds.beepHigh },
        { text: "CONNECTION ESTABLISHED", type: "success", delay: 600, sound: sounds.beepSound },
        { text: "ATTEMPTING SECURITY BYPASS...", type: "warning", delay: 1000, sound: sounds.beepLow },
        { text: "FIREWALL DETECTED. INITIATING COUNTERMEASURES...", type: "warning", delay: 1200, sound: sounds.alertSound },
        { progress: "BYPASSING SECURITY", duration: 2000, sound: sounds.beepLow },
        { text: "ACCESS LEVEL 1 ACHIEVED", type: "success", delay: 500, sound: sounds.successSound },
        { text: "SCANNING FOR VULNERABILITIES...", type: "command", delay: 800, sound: sounds.beepLow },
        { text: "MULTIPLE ENTRY POINTS DETECTED", type: "success", delay: 600, sound: sounds.beepHigh },
        { text: "INITIATING DEEP SCAN OF DATABASE...", type: "command", delay: 1000, sound: sounds.beepLow },
        { progress: "DATABASE INFILTRATION", duration: 2500, sound: sounds.beepHigh },
        { text: "DECRYPTING USER CREDENTIALS...", type: "warning", delay: 1000, sound: sounds.beepSound },
        { text: "ERROR: ADVANCED ENCRYPTION DETECTED", type: "error", delay: 800, sound: sounds.errorSound },
        { text: "DEPLOYING QUANTUM DECRYPTION ALGORITHM...", type: "command", delay: 1200, sound: sounds.beepLow },
        { progress: "DECRYPTION PROGRESS", duration: 3000, sound: sounds.beepHigh },
        { text: "ADMIN ACCESS GRANTED", type: "success", delay: 500, sound: sounds.successSound },
        { text: "DOWNLOADING SECURE FILES...", type: "command", delay: 1000, sound: sounds.beepLow },
        { text: "RETRIEVING GAME DATABASE...", type: "info", delay: 800, sound: sounds.beepHigh },
        { progress: "FILE TRANSFER", duration: 2000, sound: sounds.beepLow },
        { text: "DOWNLOAD COMPLETE: 1,457 FILES TRANSFERRED", type: "success", delay: 600, sound: sounds.beepSound },
        { text: "SECURING CONNECTION PATHWAY...", type: "command", delay: 800, sound: sounds.beepHigh },
        { text: "ERASING DIGITAL FOOTPRINT...", type: "warning", delay: 1000, sound: sounds.beepLow },
        { text: "NO TRACE PROTOCOL ACTIVATED", type: "success", delay: 500, sound: sounds.beepSound },
        { text: "INITIALIZING NEURAL INTERFACE...", type: "info", delay: 1200, sound: sounds.beepHigh },
        { progress: "CYBERNETIC INTEGRATION", duration: 2500, sound: sounds.beepLow },
        { text: "SYSTEM READY. SECURITY MEASURES DEACTIVATED.", type: "success", delay: 500, sound: sounds.successSound },
        { glitch: "ACCESS GRANTED - WELCOME TO NEOTECH GAMING", delay: 1000, sound: sounds.accessGranted },
        { text: "PRESS ENTER TO ACCESS THE SYSTEM", type: "command", delay: 800, final: true, sound: sounds.accessSound }
    ];
    
    let currentIndex = 0;
    
    // Process the next item in the terminal sequence
    function processNextItem() {
        if (currentIndex >= terminalSequence.length) {
            return;
        }
        
        const item = terminalSequence[currentIndex];
        currentIndex++;
        
        if (item.sound) {
            // Play sound using our Web Audio API function
            if (typeof item.sound === 'function') {
                item.sound();
            } else {
                console.log('Using sound function');
                sounds[item.sound] && sounds[item.sound]();
            }
        }
        
        if (item.text) {
            addTerminalLine(item.text, item.type);
            
            if (item.final) {
                setTimeout(() => {
                    console.log('Final item reached, showing continue button');
                    continueBtn.style.display = 'block';
                    continueBtn.classList.add('blink');
                    
                    // Play access granted sound using our sound system
                    sounds.accessGranted();
                    
                    // Force focus to body to ensure Enter key works
                    document.body.focus();
                    
                    // Add debug click to continue button after 5 seconds if no interaction
                    setTimeout(() => {
                        if (continueBtn.style.display === 'block') {
                            console.log('Auto-continuing after timeout');
                            continueBtn.click();
                        }
                    }, 5000);
                }, item.delay + 1000);
            } else {
                setTimeout(processNextItem, item.delay);
            }
        } else if (item.progress) {
            addProgressBar(item.progress, item.duration);
            setTimeout(processNextItem, item.duration + 300);
        } else if (item.glitch) {
            addGlitchText(item.glitch);
            setTimeout(processNextItem, item.delay);
        }
    }
    
    // Add a new line to the terminal
    function addTerminalLine(text, type) {
        const line = document.createElement('div');
        line.className = `terminal-line ${type} typing`;
        
        if (type === 'command') {
            line.innerHTML = `<span style="color: #0ff;">></span> ${text}`;
        } else {
            line.textContent = text;
        }
        
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        
        // Play typing sound using our sound system
        sounds.typingSound();
        
        // Add random keypress sounds during typing
        const keypressTimes = Math.floor(text.length / 5);
        for (let i = 0; i < keypressTimes; i++) {
            setTimeout(() => {
                // Use our sound system for keypress sounds
                const keypressSound = Math.random() > 0.5 ? sounds.beepHigh : sounds.beepLow;
                keypressSound();
            }, i * 120);
        }
        
        // Simulate typing effect
        simulateTyping(line, text.length, 40);
    }
    
    // Add a glitch text effect
    function addGlitchText(text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<h1 class="glitch" data-text="${text}">${text}</h1>`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    // Add a progress bar to the terminal
    function addProgressBar(text, duration) {
        const progressContainer = document.createElement('div');
        progressContainer.innerHTML = `
            <div class="terminal-line">${text}</div>
            <div class="progress-bar">
                <div class="progress-bar-fill"></div>
                <div class="progress-bar-text">0%</div>
            </div>
        `;
        terminal.appendChild(progressContainer);
        terminal.scrollTop = terminal.scrollHeight;
        
        // Play loading sound when progress bar starts
        sounds.loadingSound();
        
        const progressBar = progressContainer.querySelector('.progress-bar-fill');
        const progressText = progressContainer.querySelector('.progress-bar-text');
        
        // Animate the progress bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
            
            // Play extra sounds at specific points
            if (progress === 25 || progress === 50 || progress === 75) {
                sounds.beepSound();
            }
            if (progress === 100) {
                sounds.successSound();
            }
            
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, duration / 100);
    }
    
    // Simulate typing effect
    function simulateTyping(element, length, speed) {
        element.style.width = '0';
        let width = 0;
        const interval = setInterval(() => {
            width += 5;
            element.style.width = `${width}%`;
            
            if (width >= 100) {
                clearInterval(interval);
                element.classList.remove('typing');
                element.classList.add('cursor');
                
                setTimeout(() => {
                    element.classList.remove('cursor');
                }, 1000);
            }
        }, speed);
    }
    
    // Start the terminal sequence
    setTimeout(processNextItem, 1000);
    
    // Add event handler for enter key to work as continue button
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log('Enter key pressed - closing terminal');
            
            // Directly hide and remove the terminal
            const terminalIntro = document.getElementById('terminal-intro');
            if (terminalIntro) {
                terminalIntro.style.opacity = '0';
                terminalIntro.style.display = 'none';
                
                // Completely remove the element from DOM immediately
                try {
                    terminalIntro.parentNode.removeChild(terminalIntro);
                    console.log('Terminal element removed from DOM');
                } catch (e) {
                    console.error('Error removing terminal element:', e);
                }
            }
        }
    });
    
    // Add click handler for continue button
    continueBtn.addEventListener('click', () => {
        // Play access sound
        sounds.accessSound();
        
        console.log('Continue button clicked - closing terminal');
        const terminalIntro = document.getElementById('terminal-intro');
        if (terminalIntro) {
            terminalIntro.style.opacity = '0';
            setTimeout(() => {
                terminalIntro.style.display = 'none';
                
                // Completely remove the element from DOM after animation
                try {
                    terminalIntro.parentNode.removeChild(terminalIntro);
                    console.log('Terminal element removed from DOM');
                } catch (e) {
                    console.error('Error removing terminal element:', e);
                }
            }, 500);
        } else {
            console.error('Terminal element not found!');
        }
    });
}

// Matrix canvas animation
function startMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
} 
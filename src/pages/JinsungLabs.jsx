<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Typography</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
            font-family: 'Helvetica Neue', sans-serif;
            background-color: black;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
        }

        .time {
            font-size: 6rem;
            font-weight: bold;
            position: absolute;
            z-index: 10;
        }

        .grid-text {
            position: absolute;
            font-size: 3rem;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.8);
            z-index: 5;
            white-space: nowrap;
            will-change: transform;
        }

        .random-message {
            position: absolute;
            z-index: 1;
            font-size: 2rem;
            color: red;
            will-change: transform;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <div class="time" id="current-time"></div>
    <div id="text-background"></div>

    <script>
        const timeElement = document.getElementById("current-time");
        const textBackground = document.getElementById("text-background");

        const randomMessages = [
            "Time flies when you're having fun.",
            "The clock is ticking.",
            "Every second counts.",
            "What is time?",
            "Time waits for no one.",
            "The present is a gift.",
            "Time and tide wait for none.",
            "Time is money."
        ];

        // Display current time in 12-hour format, without AM/PM
        function updateTime() {
            const now = new Date();
            const hours = now.getHours() % 12 || 12; // 12-hour format without AM/PM
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            timeElement.textContent = timeString;
        }

        // Randomly display messages in the background grid
        function randomizeText() {
            const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            const messageElement = document.createElement("div");
            messageElement.classList.add("random-message");
            messageElement.textContent = randomMessage;

            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            messageElement.style.transform = `translate(${randomX}px, ${randomY}px)`;

            textBackground.appendChild(messageElement);

            // Remove text after it finishes displaying
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }

        // Mouse interaction logic
        let mouseMovementTimer;
        document.addEventListener('mousemove', (e) => {
            clearTimeout(mouseMovementTimer);

            // Trigger random message generation only after mouse has moved a certain distance
            mouseMovementTimer = setTimeout(() => {
                randomizeText();
            }, 150);
        });

        // Initialize and update time
        setInterval(updateTime, 1000);

        // Initial call to randomize text
        setInterval(randomizeText, 4000);

        // Rotate text in a clock-wise direction
        const rotateText = document.querySelectorAll('.random-message');
        rotateText.forEach((text) => {
            let rotation = 0;
            setInterval(() => {
                rotation += 15; // Rotate 15 degrees clockwise every interval
                text.style.transform = `rotate(${rotation}deg)`;
            }, 100); // Adjust rotation speed if needed
        });
    </script>
</body>
</html>

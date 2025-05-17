document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const startBtn = document.getElementById("startBtn");
    const scoreboardBtn = document.getElementById("scoreboardBtn");
    const themeBtn = document.getElementById("themeBtn");
    const retryBtn = document.getElementById("retryBtn");
    const homeBtn = document.getElementById("homeBtn");
    const soundBtn = document.getElementById("soundBtn");
    const retryHomeBtn = document.getElementById("retryHomeBtn");
    const retrySoundBtn = document.getElementById("retrySoundBtn");
    const homeResumeBtn = document.getElementById("homeResumeBtn");
    const homeReturnBtn = document.getElementById("homeReturnBtn");
    const homeRestartBtn = document.getElementById("homeRestartBtn");
    const confirmYesBtn = document.getElementById("confirmYesBtn");
    const confirmNoBtn = document.getElementById("confirmNoBtn");
    const openBtn = document.getElementById("openBtn");
    const backBtn = document.getElementById("backBtn");
    const backToMenuBtn = document.getElementById("backToMenuBtn");
    const menu = document.getElementById("menu");
    const modeSelection = document.getElementById("modeSelection");
    const themeRoulette = document.getElementById("themeRoulette");
    const normalModeBtn = document.getElementById("normalModeBtn");
    const fastModeBtn = document.getElementById("fastModeBtn");
    const endlessModeBtn = document.getElementById("endlessModeBtn");
    const kidsModeBtn = document.getElementById("kidsModeBtn");
    const game = document.getElementById("game");
    const scoreDisplay = document.getElementById("score");
    const retryScreen = document.getElementById("retry");
    const homeMenu = document.getElementById("homeMenu");
    const confirmDialog = document.getElementById("confirmDialog");
    const countdownDisplay = document.getElementById("countdown");
    const leaderboardScreen = document.getElementById("leaderboardScreen");
    const closeLeaderboardBtn = document.getElementById("closeLeaderboardBtn");
    const leaderboardList = document.getElementById("leaderboardList");
    const coinDisplay = document.getElementById("coinDisplay");
    const currentCoinsDisplay = document.getElementById("currentCoins");
    const costAmountDisplay = document.getElementById("costAmount");
    const alertPopup = document.getElementById("alertPopup");
    const splashScreen = document.getElementById("splashScreen");
    const menuVideo = document.getElementById("menuVideo");
    const playerName = document.getElementById("playerName");
    let dieImage = document.getElementById("dieImage");

    // Canvas boyutunu ayarla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Sesler
    const jumpSound = new Audio("assets/sounds/jump.mp3");
    const errorSound = new Audio("assets/sounds/error.mp3");
    const eatSound = new Audio("assets/sounds/eat.mp3");
    const bonusSound = new Audio("assets/sounds/bonus.mp3");
    const guardSound = new Audio("assets/sounds/guard.mp3");
    const tickSound = new Audio("assets/sounds/tick.mp3");
    const winSound = new Audio("assets/sounds/win.mp3");
    const loseSound = new Audio("assets/sounds/lose.mp3");
    const highScoreSound = new Audio("assets/sounds/highscore.mp3");
    const hundredSound = new Audio("assets/sounds/hundred.mp3");
    let bgm = [
        new Audio("assets/sounds/bgm1.mp3"),
        new Audio("assets/sounds/bgm2.mp3"),
        new Audio("assets/sounds/bgm3.mp3")
    ];

    // Şu anda oynatılan BGM'yi takip et
    let currentBgm = null;

    // Ses kontrolü
    let soundOn = true;

    // BGM oynatma fonksiyonu
    function playBgm() {
        if (!soundOn) return;
        // Tüm BGM'leri durdur ve sıfırla
        bgm.forEach(m => {
            m.pause();
            m.currentTime = 0;
        });
        // Rastgele bir BGM seç ve oynat
        const randomBgm = bgm[Math.floor(Math.random() * bgm.length)];
        randomBgm.play().catch(error => {
            console.error("BGM oynatma hatası:", error);
        });
        currentBgm = randomBgm;
    }

    // Geri sayım görselleri
    const countdownImages = {
        1: new Image(),
        2: new Image(),
        3: new Image()
    };
    countdownImages[1].src = "assets/images/1.png";
    countdownImages[2].src = "assets/images/2.png";
    countdownImages[3].src = "assets/images/3.png";

    // Tema yönetimi
    let currentTheme = "default";

    // Görseller
    let playerImg = new Image();
    playerImg.src = `assets/images/sepet.png`;
    let cubeImages = {
        red: new Image(),
        blue: new Image(),
        green: new Image(),
        yellow: new Image(),
        purple: new Image(),
        orange: new Image(),
        pink: new Image(),
        cyan: new Image(),
        lime: new Image(),
        bozukelma: new Image(),
        bozukkarpuz: new Image(),
        bozukelmakare: new Image(),
        bozukkarpuzkare: new Image(),
        bozukuzum: new Image(),
        bozukarmut: new Image(),
        altinkare: new Image(),
        slowkare: new Image(),
        guardkare: new Image()
    };
    let backgroundImg = new Image();
    let bozukelmabgImg = new Image();
    let bozukkarpuzbgImg = new Image();
    let bozukuzumbgImg = new Image();
    let bozukarmutbgImg = new Image();
    let cloudImg = new Image();

    function loadTheme(themeId) {
        const path = themeId === "default" ? "assets/images" : `assets/themes/theme${themeId}`;
        playerImg.src = `${path}/sepet.png`;
        cubeImages.red.src = `${path}/cube_red.png`;
        cubeImages.blue.src = `${path}/cube_blue.png`;
        cubeImages.green.src = `${path}/cube_green.png`;
        cubeImages.yellow.src = `${path}/cube_yellow.png`;
        cubeImages.purple.src = `${path}/cube_purple.png`;
        cubeImages.orange.src = `${path}/cube_orange.png`;
        cubeImages.pink.src = `${path}/cube_pink.png`;
        cubeImages.cyan.src = `${path}/cube_cyan.png`;
        cubeImages.lime.src = `${path}/cube_lime.png`;
        cubeImages.bozukelma.src = `${path}/bozukelma.png`;
        cubeImages.bozukkarpuz.src = `${path}/bozukkarpuz.png`;
        cubeImages.bozukelmakare.src = `${path}/bozukelmakare.png`;
        cubeImages.bozukkarpuzkare.src = `${path}/bozukkarpuzkare.png`;
        cubeImages.bozukuzum.src = `${path}/bozukuzum.png`;
        cubeImages.bozukarmut.src = `${path}/bozukarmut.png`;
        cubeImages.altinkare.src = `${path}/altinkare.png`;
        cubeImages.slowkare.src = `${path}/slowkare.png`;
        cubeImages.guardkare.src = `${path}/guardkare.png`;
        backgroundImg.src = `${path}/background.png`;
        bozukelmabgImg.src = `${path}/bozukelmabg.png`;
        bozukkarpuzbgImg.src = `${path}/bozukkarpuzbg.png`;
        bozukuzumbgImg.src = `${path}/bozukuzumbg.png`;
        bozukarmutbgImg.src = `${path}/bozukarmutbg.png`;
        cloudImg.src = `${path}/bulut.png`;
        bgm = [
            new Audio(themeId === "default" ? "assets/sounds/bgm1.mp3" : `assets/themes/theme${themeId}/bgm1.mp3`),
            new Audio(themeId === "default" ? "assets/sounds/bgm2.mp3" : `assets/themes/theme${themeId}/bgm2.mp3`),
            new Audio(themeId === "default" ? "assets/sounds/bgm3.mp3" : `assets/themes/theme${themeId}/bgm3.mp3`)
        ];
        // Tema değiştiğinde mevcut BGM'yi durdur
        bgm.forEach(m => {
            m.pause();
            m.currentTime = 0;
        });
        currentBgm = null;
    }

    // İlk yüklemede default tema
    loadTheme("default");

    // Coin ve tema yönetimi
    let totalCoins = parseInt(localStorage.getItem("totalCoins")) || 0;
    let unlockedThemes = JSON.parse(localStorage.getItem("unlockedThemes")) || [];
    let kuraCount = parseInt(localStorage.getItem("kuraCount")) || 0;

    // Oyuncu ismi yönetimi
    function loadPlayerName() {
        const savedName = localStorage.getItem("playerName");
        if (savedName && savedName.trim() !== "") {
            playerName.textContent = savedName;
        } else {
            playerName.textContent = "Your Name";
        }
    }

    function savePlayerName() {
        const name = playerName.textContent.trim();
        if (name === "") {
            playerName.textContent = "Your Name";
            localStorage.setItem("playerName", "");
        } else {
            localStorage.setItem("playerName", name);
        }
    }

    // Sayfa yüklendiğinde ismi yükle
    loadPlayerName();

    // Tıklama/dokunma ile düzenleme
    playerName.addEventListener("click", () => {
        playerName.setAttribute("contenteditable", "true");
        playerName.focus(); // Mobil klavye açılır
        // Mevcut metni seç (kolay düzenleme için)
        const range = document.createRange();
        range.selectNodeContents(playerName);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });

    // Odak kaybında kaydet
    playerName.addEventListener("blur", () => {
        playerName.setAttribute("contenteditable", "false");
        savePlayerName();
    });

    // Enter tuşu ile kaydet
    playerName.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Enter'ın yeni satır oluşturmasını engelle
            playerName.blur(); // Odak kaybı ile kaydet
        }
    });

    // İsim düzenlenirken HTML eklenmesini önle ve ters yazıyı düzelt
    playerName.addEventListener("input", () => {
        // HTML etiketlerini temizle, sadece metni koru
        const text = playerName.textContent.replace(/<[^>]+>/g, '');
        playerName.textContent = text;
        // İmleci metnin sonuna taşı
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(playerName);
        range.collapse(false); // İmleci sona taşı
        sel.removeAllRanges();
        sel.addRange(range);
    });

    // Lider tablosu yönetimi
    const leaderboards = {
        normal: JSON.parse(localStorage.getItem("leaderboard_normal")) || [],
        fast: JSON.parse(localStorage.getItem("leaderboard_fast")) || [],
        endless: JSON.parse(localStorage.getItem("leaderboard_endless")) || [],
        kids: JSON.parse(localStorage.getItem("leaderboard_kids")) || []
    };

    function saveLeaderboard(mode) {
        localStorage.setItem(`leaderboard_${mode}`, JSON.stringify(leaderboards[mode]));
    }

    function updateLeaderboard(mode, score, name) {
        leaderboards[mode].push({ score, name });
        leaderboards[mode].sort((a, b) => b.score - a.score);
        leaderboards[mode] = leaderboards[mode].slice(0, 5); // En fazla 5 skor
        saveLeaderboard(mode);
    }

    function displayLeaderboard(mode) {
        leaderboardList.innerHTML = "";
        const scores = (leaderboards[mode] || []).slice(0, 3); // En fazla 3 skor
        const currentName = playerName.textContent.trim() || "Your Name";
        const displayScores = scores.slice(0, 3);
        while (displayScores.length < 3) {
            displayScores.push({ name: "-", score: "-" });
        }
    
        displayScores.forEach((entry, index) => {
            const isCurrentPlayer = entry.name === currentName && entry.score === score && entry.score !== "-";
            const rankClass = index === 0 ? "rank-1" : index === 1 ? "rank-2" : index === 2 ? "rank-3" : "rank-other";
            const item = document.createElement("div");
            item.className = `leaderboard-item ${isCurrentPlayer ? "current-player" : ""}`;
            item.innerHTML = `
                <div class="rank ${rankClass}">${index + 1}</div>
                <div class="player-info">
                    <p class="player-name">${entry.name}</p>
                </div>
                <div class="player-score">${entry.score}</div>
            `;
            leaderboardList.appendChild(item);
        });
    }

    document.querySelectorAll(".mode-tabs .tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".mode-tabs .tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const mode = tab.dataset.mode;
            displayLeaderboard(mode);
        });
    });

    function getKuraCost() {
        if (kuraCount === 0) return 1000;
        if (kuraCount === 1) return 1250;
        if (kuraCount === 2) return 1500;
        return 2000;
    }

    function updateCoinDisplay() {
        coinDisplay.querySelector("span").textContent = `Coin: ${totalCoins}`;
        if (currentCoinsDisplay) {
            currentCoinsDisplay.textContent = `${totalCoins}`;
        }
        if (costAmountDisplay) {
            costAmountDisplay.textContent = `${getKuraCost()}`;
        }
    }

    updateCoinDisplay();

    // Oyun değişkenleri
    let laneWidth = canvas.width / 4;
    let cubeSize = laneWidth;
    const lanes = [0, laneWidth, laneWidth * 2, laneWidth * 3];
    let player = { 
        x: lanes[2],
        y: canvas.height - laneWidth * 0.5,
        baseY: canvas.height - laneWidth * 0.5,
        width: laneWidth,
        height: laneWidth * 0.5,
        lane: 2, 
        jumping: false, 
        jumpHeight: 0 
    };
    let cubes = [];
    let clouds = [];
    let score = 0;
    let gameOver = false;
    let successfulJumps = 0;
    let cubeSpeed = 1;
    let baseCubeSpeed = 1;
    let penaltyActive = false;
    let penaltyType = null;
    let penaltyTimer = 0;
    let reverseControls = false;
    let animationFrameId;
    let currentMode = "kids";
    let lastCubeY = -cubeSize;
    let specialCubeCounter = 0;
    let slowTimer = 0;
    let hasGuard = false;
    let guardAnimation = false;
    let guardAnimationTimer = 0;
    let paused = false;
    let scoreTexts = []; // Array for score text animations

    // Konfeti efekt için renkler
    const confettiColors = ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#577590', '#277da1'];

    function createConfetto(index) {
        const originX = window.innerWidth / 2;
        const originY = window.innerHeight;

        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = originX + 'px';
        confetti.style.top = originY + 'px';

        // Rastgele şekil
        if (Math.random() > 0.5) {
            confetti.style.width = (Math.random() * 6 + 4) + 'px';
            confetti.style.height = (Math.random() * 6 + 4) + 'px';
            confetti.style.borderRadius = '50%'; // yuvarlak
        } else {
            confetti.style.width = (Math.random() * 8 + 6) + 'px';
            confetti.style.height = (Math.random() * 4 + 2) + 'px';
            confetti.style.borderRadius = '2px'; // dikdörtgen
        }

        retryScreen.appendChild(confetti);

        // Çıkış açısı -25° ile +25°
        const angle = (Math.random() * 50) - 25;
        const radians = (angle - 90) * (Math.PI / 180);

        const initialSpeed = Math.random() * 3 + 9; // hızlı çıkış (9-12)
        const gravity = 0.06;

        let x = 0;
        let y = 0;
        let velocityX = Math.cos(radians) * initialSpeed;
        let velocityY = Math.sin(radians) * initialSpeed;

        const rotateSpeed = (Math.random() - 0.5) * 10;
        let rotation = 0;

        function update() {
            velocityY += gravity;

            x += velocityX;
            y += velocityY;
            rotation += rotateSpeed;

            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

            // Solma kontrolü
            if (y > window.innerHeight * 0.3 && y < window.innerHeight * 0.6) {
                confetti.style.opacity -= 0.01;
            } else if (y >= window.innerHeight * 0.6) {
                confetti.style.opacity -= 0.03;
            }

            if (parseFloat(confetti.style.opacity) <= 0) {
                confetti.remove();
                cancelAnimationFrame(animation);
            } else {
                animation = requestAnimationFrame(update);
            }
        }

        // Hafif gecikmeli başlatma
        let animation;
        setTimeout(() => {
            animation = requestAnimationFrame(update);
        }, index * Math.random() * 30); // max 30ms rastgele gecikme
    }

    // Splash ekranı için dinamik yükleme
    function loadResources() {
        const images = [
            playerImg,
            cubeImages.red,
            cubeImages.blue,
            cubeImages.green,
            cubeImages.yellow,
            cubeImages.purple,
            cubeImages.orange,
            cubeImages.pink,
            cubeImages.cyan,
            cubeImages.lime,
            cubeImages.bozukelma,
            cubeImages.bozukkarpuz,
            cubeImages.bozukelmakare,
            cubeImages.bozukkarpuzkare,
            cubeImages.bozukuzum,
            cubeImages.bozukarmut,
            cubeImages.altinkare,
            cubeImages.slowkare,
            cubeImages.guardkare,
            backgroundImg,
            bozukelmabgImg,
            bozukkarpuzbgImg,
            bozukuzumbgImg,
            bozukarmutbgImg,
            cloudImg,
            countdownImages[1],
            countdownImages[2],
            countdownImages[3]
        ];

        const audios = [
            jumpSound,
            errorSound,
            eatSound,
            bonusSound,
            guardSound,
            tickSound,
            winSound,
            loseSound,
            highScoreSound,
            hundredSound,
            ...bgm
        ];

        const videoPromise = new Promise((resolve, reject) => {
            if (menuVideo.readyState >= 4) {
                resolve();
            } else {
                menuVideo.oncanplaythrough = resolve;
                menuVideo.onerror = reject;
            }
        });

        const imagePromises = images.map(img => {
            if (img.complete && img.naturalWidth !== 0) {
                return Promise.resolve();
            }
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        const audioPromises = audios.map(audio => {
            if (audio.readyState >= 4) {
                return Promise.resolve();
            }
            return new Promise((resolve, reject) => {
                audio.oncanplaythrough = resolve;
                audio.onerror = reject;
            });
        });

        return Promise.all([...imagePromises, ...audioPromises, videoPromise]);
    }

    window.addEventListener("load", () => {
        const startTime = Date.now();
        loadResources()
            .then(() => {
                const elapsed = Date.now() - startTime;
                const minDisplayTime = 1000; // Minimum 1 saniye görünürlük
                const remainingTime = Math.max(0, minDisplayTime - elapsed);
                setTimeout(() => {
                    splashScreen.style.opacity = "0";
                    setTimeout(() => {
                        splashScreen.style.display = "none";
                    }, 1000); // Fade süresi
                }, remainingTime);
            })
            .catch((error) => {
                console.error("Kaynak yükleme hatası:", error);
                // Hata durumunda da splash ekranını kaldır
                splashScreen.style.opacity = "0";
                setTimeout(() => {
                    splashScreen.style.display = "none";
                }, 1000);
            });
    });

    // Bulut oluşturma
    function spawnCloud() {
        const scale = 0.5 + Math.random() * 1.0;
        const height = cubeSize * scale;
        const width = height * (1251 / 513);
        const direction = Math.random() < 0.5 ? 1 : -1;
        const x = direction === 1 ? -width : canvas.width;
        const y = Math.random() * (canvas.height / 2 - height);
        const speed = 0.1 + Math.random() * 0.4;
        clouds.push({ x, y, width, height, scale, speed, direction });
    }

    // Coin güncelleme
    function addCoins(scoreAmount) {
        const coinsEarned = Math.floor(scoreAmount / 10);
        totalCoins += coinsEarned;
        localStorage.setItem("totalCoins", totalCoins);
        updateCoinDisplay();
    }

    // Rastgele kare küp oluştur
    function spawnCube() {
        const normalColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan", "lime"];
        const penaltyColors = ["bozukelma", "bozukkarpuz", "bozukuzum", "bozukarmut"];
        const specialColors = ["altinkare", "slowkare", "guardkare"];
        let color;
        specialCubeCounter++;

        if (penaltyActive) {
            if (penaltyType === "bozukelma") {
                color = "bozukelmakare";
            } else if (penaltyType === "bozukkarpuz") {
                color = "bozukkarpuzkare";
            } else if (penaltyType === "bozukuzum") {
                color = "purple";
            } else if (penaltyType === "bozukarmut") {
                color = "pink";
            }
        } else if (specialCubeCounter >= 40) {
            color = specialColors[Math.floor(Math.random() * specialColors.length)];
            specialCubeCounter = 0;
        } else {
            color = Math.random() < 0.05 ? penaltyColors[Math.floor(Math.random() * 4)] : normalColors[Math.floor(Math.random() * 9)];
        }

        let lane = Math.floor(Math.random() * 4);
        let secondLane = null;
        let spawnY = -cubeSize;

        if (currentMode === "endless") {
            const topCube = cubes.reduce((min, cube) => cube.y < min.y ? cube : min, { y: Infinity });
            spawnY = (topCube.y === Infinity || topCube.y >= 0) ? -cubeSize : topCube.y - cubeSize * 0.1;
            const sameYPosition = cubes.some(cube => Math.abs(cube.y - spawnY) < cubeSize * 0.2);
            if (sameYPosition) {
                return;
            }
            lastCubeY = spawnY;
        }

        if (penaltyActive && penaltyType === "bozukarmut") {
            const lanePairs = [[0, 1], [1, 2], [2, 3]];
            const pair = lanePairs[Math.floor(Math.random() * 3)];
            lane = pair[0];
            secondLane = pair[1];
        }

        cubes.push({
            x: lanes[lane],
            y: spawnY,
            width: cubeSize,
            height: cubeSize,
            color: color,
            originalLane: lane
        });

        if (secondLane !== null) {
            cubes.push({
                x: lanes[secondLane],
                y: spawnY,
                width: cubeSize,
                height: cubeSize,
                color: color,
                originalLane: secondLane
            });
        }
    }

    // Hız artışı
    function updateSpeed() {
        if (currentMode === "normal") {
            baseCubeSpeed = 5 + (15 - 5) * Math.min(score / 1000, 1);
        } else if (currentMode === "fast") {
            baseCubeSpeed = 8 + (12 - 8) * Math.min(score / 1000, 1);
        } else if (currentMode === "endless") {
            baseCubeSpeed = 3 + (8 - 3) * Math.min(score / 1000, 1);
        } else if (currentMode === "kids") {
            baseCubeSpeed = 1.5 + (8 - 1.5) * Math.min(score / 1000, 1);
        }
        cubeSpeed = slowTimer > 0 ? baseCubeSpeed * 0.5 : (penaltyActive && penaltyType === "bozukuzum" ? baseCubeSpeed * 3 : baseCubeSpeed);
    }

    // Oyun döngüsü
    function gameLoop() {
        if (gameOver || paused) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (penaltyActive) {
            if (penaltyType === "bozukelma") {
                ctx.drawImage(bozukelmabgImg, 0, 0, canvas.width, canvas.height);
            } else if (penaltyType === "bozukkarpuz") {
                ctx.drawImage(bozukkarpuzbgImg, 0, 0, canvas.width, canvas.height);
            } else if (penaltyType === "bozukuzum") {
                ctx.drawImage(bozukuzumbgImg, 0, 0, canvas.width, canvas.height);
            } else if (penaltyType === "bozukarmut") {
                ctx.drawImage(bozukarmutbgImg, 0, 0, canvas.width, canvas.height);
            }
        } else {
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        }

        let cloudsToRemove = [];
        clouds.forEach((cloud, index) => {
            cloud.x += cloud.speed * cloud.direction;
            ctx.drawImage(cloudImg, cloud.x, cloud.y, cloud.width, cloud.height);
            if (cloud.direction === 1 && cloud.x > canvas.width) {
                cloudsToRemove.push(index);
            } else if (cloud.direction === -1 && cloud.x + cloud.width < 0) {
                cloudsToRemove.push(index);
            }
        });
        cloudsToRemove.sort((a, b) => b - a);
        cloudsToRemove.forEach(index => clouds.splice(index, 1));

        if (Math.random() < 0.002) {
            spawnCloud();
        }

        // Draw score texts behind player
        let scoreTextsToRemove = [];
        scoreTexts.forEach((text, index) => {
            text.y -= 2; // Move upward
            text.scale += 0.02; // Grow in size
            text.opacity = Math.max(0, text.opacity - 0.02); // Ensure smooth fade

            if (text.opacity > 0) {
                ctx.save();
                ctx.globalAlpha = text.opacity;
                ctx.font = `${30 * text.scale}px GameFont, Arial, sans-serif`;
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text.value.toString(), text.x, text.y);
                ctx.restore();
            } else {
                scoreTextsToRemove.push(index);
            }
        });
        scoreTextsToRemove.sort((a, b) => b - a);
        scoreTextsToRemove.forEach(index => scoreTexts.splice(index, 1));

        if (penaltyActive) {
            if (playerImg.src !== `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/sepetceza.png`) {
                playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/sepetceza.png`;
            }
            penaltyTimer -= 1 / 60;
            if (penaltyTimer <= 0) {
                penaltyActive = false;
                penaltyType = null;
                reverseControls = false;
                playerImg.src = (hasGuard || slowTimer > 0) ? `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/karakterguard.png` : `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/sepet.png`;
            }
        } else if ((hasGuard || slowTimer > 0) && playerImg.src !== `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/karakterguard.png`) {
            playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/karakterguard.png`;
        } else if (!hasGuard && slowTimer <= 0 && !penaltyActive && playerImg.src !== `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/sepet.png`) {
            playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/sepet.png`;
        }

        if (slowTimer > 0) {
            slowTimer -= 1 / 60;
            if (slowTimer <= 0) {
                cubeSpeed = penaltyActive && penaltyType === "bozukuzum" ? baseCubeSpeed * 3 : baseCubeSpeed;
                if (!hasGuard && !penaltyActive) {
                    playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/sepet.png`;
                }
            }
        }

        if (guardAnimation) {
            guardAnimationTimer += 1 / 60;
            const progress = guardAnimationTimer;
            const maxScale = 2;
            const scale = 1 + progress * (maxScale - 1);
            const opacity = 1 - progress;
            const imgSize = cubeSize * scale;
            ctx.globalAlpha = opacity;
            ctx.drawImage(
                cubeImages.guardkare,
                (canvas.width - imgSize) / 2,
                (canvas.height - imgSize) / 2,
                imgSize,
                imgSize
            );
            ctx.globalAlpha = 1;

            if (guardAnimationTimer >= 1) {
                guardAnimation = false;
                guardAnimationTimer = 0;
                lastCubeY = -cubeSize;
            }
        } else {
            let cubesToRemove = [];
            cubes.forEach((cube, index) => {
                cube.y += cubeSpeed;

                if (penaltyActive && penaltyType === "bozukelma" && cube.y >= canvas.height / 2 && cube.y < canvas.height / 2 + cubeSpeed) {
                    cube.x = lanes[Math.floor(Math.random() * 4)];
                }

                ctx.drawImage(cubeImages[cube.color], cube.x, cube.y, cube.width, cube.height);

                if (
                    cube.y + cube.height > player.y &&
                    cube.y < player.y + player.height &&
                    player.x >= cube.x &&
                    player.x + player.width <= cube.x + cube.width
                ) {
                    const prevScore = score; // Önceki skoru kaydet
                    if (cube.color === "bozukelma" || cube.color === "bozukkarpuz" || cube.color === "bozukuzum" || cube.color === "bozukarmut") {
                        penaltyActive = true;
                        penaltyType = cube.color;
                        penaltyTimer = 10;
                        reverseControls = cube.color === "bozukkarpuz";
                        playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/sepetceza.png`;
                        if (cube.color === "bozukuzum") {
                            cubeSpeed = baseCubeSpeed * 3;
                        }
                        cubesToRemove.push(index);
                    } else if (cube.color === "altinkare") {
                        score += 50;
                        addCoins(50);
                        playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/karakterguard.png`;
                        if (soundOn) {
                            bonusSound.play();
                        }
                        cubesToRemove.push(index);
                    } else if (cube.color === "slowkare") {
                        slowTimer = 5;
                        cubeSpeed = baseCubeSpeed * 0.5;
                        playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/karakterguard.png`;
                        if (soundOn) {
                            bonusSound.play();
                        }
                        cubesToRemove.push(index);
                    } else if (cube.color === "guardkare") {
                        hasGuard = true;
                        playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/karakterguard.png`;
                        if (soundOn) {
                            bonusSound.play();
                        }
                        cubesToRemove.push(index);
                    } else {
                        score += 10;
                        addCoins(10);
                        successfulJumps++;
                        if (soundOn) {
                            jumpSound.play();
                            eatSound.play();
                        }
                        cubesToRemove.push(index);
                    }
                    // 100 skorda bir ses ve yeni metin animasyonu
                    if (score >= 100 && score % 100 === 0 && prevScore % 100 !== 0) {
                        if (soundOn) {
                            hundredSound.play();
                        }
                        scoreTexts.push({
                            value: score,
                            x: player.x + player.width / 2,
                            y: player.y,
                            scale: 1,
                            opacity: 0.5
                        });
                    }
                    updateSpeed();
                }

                if (cube.y > canvas.height) {
                    if (
                        cube.color !== "bozukelma" &&
                        cube.color !== "bozukkarpuz" &&
                        cube.color !== "bozukuzum" &&
                        cube.color !== "bozukarmut" &&
                        cube.color !== "altinkare" &&
                        cube.color !== "slowkare" &&
                        cube.color !== "guardkare" &&
                        player.lane !== cube.originalLane
                    ) {
                        if (hasGuard) {
                            hasGuard = false;
                            cubes = [];
                            guardAnimation = true;
                            guardAnimationTimer = 0;
                            playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/sepet.png`;
                            if (soundOn) {
                                guardSound.play();
                            }
                        } else {
                            endGame();
                        }
                    }
                    cubesToRemove.push(index);
                }
            });

            cubesToRemove.sort((a, b) => b - a);
            cubesToRemove.forEach(index => cubes.splice(index, 1));
        }

        if (player.jumping) {
            player.jumpHeight += 5;
            player.y = player.baseY + player.height - player.jumpHeight;
            if (player.jumpHeight >= 50) {
                player.jumping = false;
                player.y = player.baseY;
                player.jumpHeight = 0;
            }
        }

        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

        const barHeight = 5;
        if (penaltyActive && penaltyTimer > 0) {
            const penaltyRatio = penaltyTimer / 10;
            ctx.fillStyle = "red";
            ctx.fillRect(0, 0, canvas.width * penaltyRatio, barHeight);
            ctx.fillRect(0, canvas.height - barHeight, canvas.width * penaltyRatio, barHeight);
        }
        if (slowTimer > 0) {
            const slowRatio = slowTimer / 5;
            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, canvas.width * slowRatio, barHeight);
            ctx.fillRect(0, canvas.height - barHeight, canvas.width * slowRatio, barHeight);
        } else if (hasGuard) {
            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, canvas.width, barHeight);
            ctx.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
        }

        scoreDisplay.textContent = `Skor: ${score}`;

        let spawnChance;
        if (currentMode === "kids") {
            spawnChance = 0.015;
        } else if (currentMode === "normal") {
            spawnChance = 0.015;
        } else if (currentMode === "fast") {
            spawnChance = 0.015;
        } else if (currentMode === "endless") {
            const minSpacing = cubeSize * 0.1;
            const topCubeY = cubes.length > 0 ? Math.min(...cubes.map(cube => cube.y)) : Infinity;
            if (!guardAnimation && (topCubeY >= minSpacing || cubes.length === 0)) {
                spawnCube();
            }
        }

        if (currentMode !== "endless" && !guardAnimation && (cubes.length === 0 || (cubes[cubes.length - 1].y > cubeSize * 2 && Math.random() < spawnChance))) {
            spawnCube();
        }

        animationFrameId = requestAnimationFrame(gameLoop);
    }

    // Oyun sonu
    function endGame() {
        gameOver = true;
        if (soundOn) errorSound.play();
        retryScreen.style.display = "flex";
        game.classList.add("retry-active");
        bgm.forEach(m => {
            m.pause();
            m.currentTime = 0;
        });
        currentBgm = null;
        // Skoru lider tablosuna kaydet
        updateLeaderboard(currentMode, score, playerName.textContent.trim() || "Your Name");
        // Yüksek skor kontrolü: Lider tablosu boşsa veya skor mevcut 1. skordan büyükse
        const isHighScore = leaderboards[currentMode].length === 0 || score > leaderboards[currentMode][0].score;
        if (isHighScore) {
            // High score case: Replace img with video
            const video = document.createElement("video");
            video.id = "dieImage";
            video.src = "assets/images/highscore.webm";
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsinline = true;
            video.style.width = "200px";
            video.style.height = "auto";
            // Check if dieImage exists before replacing
            if (dieImage && dieImage.parentNode) {
                dieImage.parentNode.replaceChild(video, dieImage);
            } else {
                // Fallback: Append video to retryScreen if dieImage is not found
                retryScreen.appendChild(video);
            }
            // Update dieImage to point to the new video element
            dieImage = document.getElementById("dieImage");
            // Konfeti efektini başlat
            const totalPieces = 500;
            for (let i = 0; i < totalPieces; i++) {
                createConfetto(i);
            }
            if (soundOn) {
                highScoreSound.play();
            }
        } else {
            // Non-high-score case: Use die.png
            if (dieImage) {
                dieImage.src = "assets/images/die.png";
            }
        }
    }

    // Klavye kontrolleri
    document.addEventListener("keydown", (e) => {
        if (gameOver || paused) return;
        let direction = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
        if (reverseControls) direction *= -1;
        if (direction !== 0 && !player.jumping) {
            const newLane = player.lane + direction;
            if (newLane >= 0 && newLane <= 3) {
                player.lane = newLane;
                player.x = lanes[player.lane];
                player.jumping = true;
                player.jumpHeight = 0;
                player.y = player.baseY + player.height;
            }
        }
    });

    // Dokunmatik kontroller (mobil için kaydırma)
    let touchStartX = null;

    canvas.addEventListener("touchstart", (e) => {
        if (gameOver || paused) return;
        e.preventDefault();
        touchStartX = e.touches[0].clientX;
    });

    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
    });

    canvas.addEventListener("touchend", (e) => {
        if (gameOver || paused || touchStartX === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        let direction = 0;

        if (Math.abs(deltaX) > 50) { // ~50 piksel hassasiyet
            direction = deltaX > 0 ? 1 : -1;
        }

        if (reverseControls) direction *= -1;

        if (direction !== 0 && !player.jumping) {
            const newLane = player.lane + direction;
            if (newLane >= 0 && newLane <= 3) {
                player.lane = newLane;
                player.x = lanes[player.lane];
                player.jumping = true;
                player.jumpHeight = 0;
                player.y = player.baseY + player.height;
            }
        }

        touchStartX = null;
    });

    // Theme Roulette yönetimi
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    openBtn.addEventListener("click", () => {
        const cost = getKuraCost();
        if (totalCoins < cost) {
            alertPopup.style.display = "flex";
            setTimeout(() => {
                alertPopup.style.display = "none";
            }, 2000);
            return;
        }

        totalCoins -= cost;
        kuraCount++;
        localStorage.setItem("totalCoins", totalCoins);
        localStorage.setItem("kuraCount", kuraCount);
        updateCoinDisplay();

        const themeItems = document.querySelectorAll(".theme-item");
        themeItems.forEach(item => item.classList.remove("glow", "green-glow", "red-glow"));

        let speed = 200;
        let elapsed = 0;
        const totalDuration = 5000;
        const themes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let shuffledThemes = shuffleArray([...themes]);
        let currentIndex = 0;

        const interval = setInterval(() => {
            themeItems.forEach(item => item.classList.remove("glow"));
            const themeId = shuffledThemes[currentIndex];
            themeItems[themeId - 1].classList.add("glow");
            if (soundOn) {
                tickSound.play();
            }

            currentIndex = (currentIndex + 1) % themes.length;
            if (currentIndex === 0) {
                shuffledThemes = shuffleArray([...themes]);
            }

            elapsed += speed;
            if (elapsed >= totalDuration * 0.4) {
                speed = Math.min(speed + 50, 500);
            }

            if (elapsed >= totalDuration) {
                clearInterval(interval);
                const selectedTheme = Math.floor(Math.random() * 9) + 1;
                themeItems.forEach(item => item.classList.remove("glow"));
                const selectedItem = themeItems[selectedTheme - 1];

                const isAlreadyUnlocked = unlockedThemes.includes(selectedTheme.toString());
                if (soundOn) {
                    if (isAlreadyUnlocked) {
                        loseSound.play();
                    } else {
                        winSound.play();
                    }
                }

                if (isAlreadyUnlocked) {
                    selectedItem.classList.add("red-glow");
                    totalCoins += Math.floor(cost / 2);
                    localStorage.setItem("totalCoins", totalCoins);
                    updateCoinDisplay();
                } else {
                    selectedItem.classList.add("green-glow");
                    unlockedThemes.push(selectedTheme.toString());
                    localStorage.setItem("unlockedThemes", JSON.stringify(unlockedThemes));
                    selectedItem.classList.remove("locked");
                }
            }
        }, speed);
    });

    // Tema seçimi
    function updateThemeIndicators() {
        const themeItems = document.querySelectorAll(".theme-item");
        themeItems.forEach(item => {
            const overlay = item.querySelector(".theme-overlay");
            if (overlay) {
                overlay.remove();
            }
        });

        if (currentTheme !== "default") {
            const selectedItem = document.querySelector(`.theme-item[data-theme="${currentTheme}"]`);
            if (selectedItem) {
                const overlay = document.createElement("img");
                overlay.src = "assets/images/temaonay.png";
                overlay.className = "theme-overlay";
                overlay.style.position = "absolute";
                overlay.style.width = "50px";
                overlay.style.height = "50px";
                overlay.style.top = "50%";
                overlay.style.left = "50%";
                overlay.style.transform = "translate(-50%, -50%)";
                overlay.style.opacity = "0.8";
                selectedItem.appendChild(overlay);
            }
        }
    }

    function showRejectAnimation(item) {
        const overlay = document.createElement("img");
        overlay.src = "assets/images/temaret.png";
        overlay.className = "theme-overlay";
        overlay.style.position = "absolute";
        overlay.style.width = "50px";
        overlay.style.height = "50px";
        overlay.style.top = "50%";
        overlay.style.left = "50%";
        overlay.style.transform = "translate(-50%, -50%)";
        overlay.style.opacity = "0.8";
        item.appendChild(overlay);

        let flashCount = 0;
        const flashInterval = setInterval(() => {
            overlay.style.opacity = flashCount % 2 === 0 ? "0" : "0.8";
            flashCount++;
            if (flashCount >= 4) {
                clearInterval(flashInterval);
                overlay.remove();
            }
        }, 250);
    }

    document.querySelectorAll(".theme-item").forEach(item => {
        item.addEventListener("click", () => {
            const themeId = item.dataset.theme;
            const isUnlocked = unlockedThemes.includes(themeId);

            if (isUnlocked) {
                if (currentTheme === themeId) {
                    currentTheme = "default";
                    loadTheme(currentTheme);
                } else {
                    currentTheme = themeId;
                    loadTheme(currentTheme);
                }
                updateThemeIndicators();
            } else {
                showRejectAnimation(item);
            }
        });
    });

    // Oyun başlatma
    function startGame(mode) {
        currentMode = mode;
        game.style.display = "block";
        modeSelection.style.display = "none";
        menu.style.display = "none";
        themeRoulette.style.display = "none";
        gameOver = false;
        paused = false;
        score = 0;
        successfulJumps = 0;
        cubes = [];
        clouds = [];
        scoreTexts = []; // Clear score texts
        for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
            spawnCloud();
        }
        player.x = lanes[2];
        player.y = player.baseY;
        player.lane = 2;
        retryScreen.style.display = "none";
        game.classList.remove("retry-active");
        homeMenu.style.display = "none";
        confirmDialog.style.display = "none";
        penaltyActive = false;
        penaltyType = null;
        penaltyTimer = 0;
        reverseControls = false;
        playerImg.src = `${currentTheme === "default" ? "assets/images" : `assets/themes/theme${currentTheme}`}/sepet.png`;
        // Ensure dieImage is an img element at game start
        dieImage = document.getElementById("dieImage"); // Re-fetch dieImage
        if (dieImage && dieImage.tagName.toLowerCase() !== "img") {
            const img = document.createElement("img");
            img.id = "dieImage";
            img.src = "assets/images/die.png";
            img.style.width = "200px";
            img.style.height = "auto";
            if (dieImage.parentNode) {
                dieImage.parentNode.replaceChild(img, dieImage);
            }
            dieImage = img; // Update dieImage reference
        } else if (dieImage) {
            dieImage.src = "assets/images/die.png";
        } else {
            // Fallback: Create new img if dieImage is null
            const img = document.createElement("img");
            img.id = "dieImage";
            img.src = "assets/images/die.png";
            img.style.width = "200px";
            img.style.height = "auto";
            retryScreen.appendChild(img);
            dieImage = img;
        }
        lastCubeY = -cubeSize;
        specialCubeCounter = 0;
        slowTimer = 0;
        hasGuard = false;
        guardAnimation = false;
        guardAnimationTimer = 0;
        highScoreSound.pause();
        highScoreSound.currentTime = 0;

        if (currentMode === "normal") {
            baseCubeSpeed = 5;
            cubeSpeed = 5;
        } else if (currentMode === "fast") {
            baseCubeSpeed = 8;
            cubeSpeed = 8;
        } else if (currentMode === "endless") {
            baseCubeSpeed = 3;
            cubeSpeed = 3;
        } else if (currentMode === "kids") {
            baseCubeSpeed = 1.5;
            cubeSpeed = 1.5;
        }

        playBgm();
        gameLoop();
    }

    // Ses kontrolü
    soundBtn.addEventListener("click", () => {
        soundOn = !soundOn;
        soundBtn.style.background = soundOn 
            ? "url('assets/images/sound-on.png') no-repeat center center / contain" 
            : "url('assets/images/sound-off.png') no-repeat center center / contain";
        retrySoundBtn.style.background = soundOn 
            ? "url('assets/images/sound-on.png') no-repeat center center / contain" 
            : "url('assets/images/sound-off.png') no-repeat center center / contain";
        if (soundOn) {
            playBgm();
        } else {
            bgm.forEach(m => {
                m.pause();
                m.currentTime = 0;
            });
            highScoreSound.pause();
            highScoreSound.currentTime = 0;
            hundredSound.pause();
            hundredSound.currentTime = 0;
            currentBgm = null;
        }
    });

    retrySoundBtn.addEventListener("click", () => {
        soundOn = !soundOn;
        soundBtn.style.background = soundOn 
            ? "url('assets/images/sound-on.png') no-repeat center center / contain" 
            : "url('assets/images/sound-off.png') no-repeat center center / contain";
        retrySoundBtn.style.background = soundOn 
            ? "url('assets/images/sound-on.png') no-repeat center center / contain" 
            : "url('assets/images/sound-off.png') no-repeat center center / contain";
        if (soundOn) {
            playBgm();
        } else {
            bgm.forEach(m => {
                m.pause();
                m.currentTime = 0;
            });
            highScoreSound.pause();
            highScoreSound.currentTime = 0;
            hundredSound.pause();
            hundredSound.currentTime = 0;
            currentBgm = null;
        }
    });

    // Menü butonları
    startBtn.addEventListener("click", () => {
        menu.style.display = "none";
        modeSelection.style.display = "flex";
    });

    normalModeBtn.addEventListener("click", () => startGame("normal"));
    fastModeBtn.addEventListener("click", () => startGame("fast"));
    endlessModeBtn.addEventListener("click", () => startGame("endless"));
    kidsModeBtn.addEventListener("click", () => startGame("kids"));

    scoreboardBtn.addEventListener("click", () => {
        menu.style.display = "none";
        leaderboardScreen.style.display = "flex";
        displayLeaderboard("normal"); // Varsayılan olarak normal modu göster
        document.querySelector(".mode-tabs .tab[data-mode='normal']").classList.add("active");
    });

    closeLeaderboardBtn.addEventListener("click", () => {
        leaderboardScreen.style.display = "none";
        menu.style.display = "flex";
    });

    themeBtn.addEventListener("click", () => {
        menu.style.display = "none";
        themeRoulette.style.display = "flex";
        const themeItems = document.querySelectorAll(".theme-item");
        themeItems.forEach(item => {
            const themeId = item.dataset.theme;
            if (!unlockedThemes.includes(themeId)) {
                item.classList.add("locked");
            } else {
                item.classList.remove("locked");
            }
        });
        updateThemeIndicators();
    });

    backBtn.addEventListener("click", () => {
        themeRoulette.style.display = "none";
        menu.style.display = "flex";
    });

    backToMenuBtn.addEventListener("click", () => {
        modeSelection.style.display = "none";
        menu.style.display = "flex";
    });

    retryBtn.addEventListener("click", () => {
        highScoreSound.pause();
        highScoreSound.currentTime = 0;
        startGame(currentMode);
    });

    homeBtn.addEventListener("click", () => {
        if (homeMenu.style.display === "none") {
            paused = true;
            homeMenu.style.display = "block";
            bgm.forEach(m => {
                m.pause();
                m.currentTime = 0;
            });
            currentBgm = null;
        } else {
            homeMenu.style.display = "none";
            countdownDisplay.style.display = "block";
            let countdown = 3;
            countdownDisplay.innerHTML = `<img src="${countdownImages[countdown].src}" style="width: 150px; height: 150px;">`;
            const countdownInterval = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    countdownDisplay.innerHTML = `<img src="${countdownImages[countdown].src}" style="width: 150px; height: 150px;">`;
                } else {
                    countdownDisplay.style.display = "none";
                    clearInterval(countdownInterval);
                    paused = false;
                    playBgm();
                    gameLoop();
                }
            }, 1000);
        }
    });

    homeResumeBtn.addEventListener("click", () => {
        homeMenu.style.display = "none";
        countdownDisplay.style.display = "block";
        let countdown = 3;
        countdownDisplay.innerHTML = `<img src="${countdownImages[countdown].src}" style="width: 150px; height: 150px;">`;
        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                countdownDisplay.innerHTML = `<img src="${countdownImages[countdown].src}" style="width: 150px; height: 150px;">`;
            } else {
                countdownDisplay.style.display = "none";
                clearInterval(countdownInterval);
                paused = false;
                playBgm();
                gameLoop();
            }
        }, 1000);
    });

    homeRestartBtn.addEventListener("click", () => {
        highScoreSound.pause();
        highScoreSound.currentTime = 0;
        startGame(currentMode);
    });

    homeReturnBtn.addEventListener("click", () => {
        confirmDialog.style.display = "block";
        homeMenu.style.display = "none";
    });

    confirmYesBtn.addEventListener("click", () => {
        confirmDialog.style.display = "none";
        game.style.display = "none";
        menu.style.display = "flex";
        bgm.forEach(m => {
            m.pause();
            m.currentTime = 0;
        });
        currentBgm = null;
        cancelAnimationFrame(animationFrameId);
    });

    confirmNoBtn.addEventListener("click", () => {
        confirmDialog.style.display = "none";
        homeMenu.style.display = "block";
    });

    retryHomeBtn.addEventListener("click", () => {
        retryScreen.style.display = "none";
        game.classList.remove("retry-active");
        game.style.display = "none";
        menu.style.display = "flex";
        highScoreSound.pause();
        highScoreSound.currentTime = 0;
        cancelAnimationFrame(animationFrameId);
    });
});
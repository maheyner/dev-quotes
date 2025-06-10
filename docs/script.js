let quotes = [];

// Load quotes from JSON file
fetch('developer_jokes.json')
    .then(response => response.json())
    .then(data => {
        quotes = data;
    })
    .catch(error => {
        console.error('Error loading quotes:', error);
        // Fallback quotes if JSON fails to load
        quotes = [
            "The only way to do great work is to love what you do. – Steve Jobs",
            "Success is not the key to happiness. Happiness is the key to success.",
            "Believe you can and you're halfway there. – Theodore Roosevelt",
            "You miss 100% of the shots you don't take. – Wayne Gretzky",
            "The best time to plant a tree was 20 years ago. The second best time is now.",
        ];
    });

function typeQuote(quote, element, delay = 60, onComplete) {
    element.textContent = '';
    element.style.display = 'block';
    const words = quote.split(' ');
    let i = 0;
    function typeNext() {
        if (i < words.length) {
            element.textContent += (i === 0 ? '' : ' ') + words[i];
            i++;
            setTimeout(typeNext, delay + Math.random() * 80);
        } else if (onComplete) {
            onComplete();
        }
    }
    typeNext();
}

window.onload = function() {
    const quoteElement = document.getElementById('quote');
    const btn = document.getElementById('generate-btn');
    const shareBtn = document.getElementById('linkedin-share');
    const imgblock = document.getElementById('quote-img');
    if (btn) {
        btn.onclick = function() {
            btn.classList.add('hide');
            setTimeout(() => { btn.style.display = 'none'; }, 400);
            quoteElement.style.display = 'block';
            const randomIndex = Math.floor(Math.random() * quotes.length);
            console.info(`Selected quote index: ${randomIndex}`);
            const quoteText = quotes[randomIndex].Joke || quotes[randomIndex];
            if (quotes[randomIndex].ascii_art) {
                fetch(quotes[randomIndex].ascii_art)
                    .then(response => response.text())
                    .then(html => {                        
                        imgblock.style.display = 'inline-block';
                        imgblock.innerHTML =""
                        //split html by <br>
                        const lines = html.split(/<br>/);
                        // append line by line to the innerHTML
                        let i=100;
                        console.info(lines.length);
                        lines.forEach(line => {
                            i += 100;
                            setTimeout(() => {
                            imgblock.innerHTML += line + '<br>';
                            }, i);
                                                    
                        });
                    })
                    .catch(error => {
                        console.error('Error loading ASCII art:', error);
                        imgblock.style.display = 'none';
                    });
            } else {
                imgblock.style.display = 'none';
            }
            typeQuote(quoteText, quoteElement, 60, function() {
                if (shareBtn) {
                    const shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href) +
                        '&summary=' + encodeURIComponent(quoteText);
                    shareBtn.href = shareUrl;
                    shareBtn.style.display = 'inline-block';
                    shareBtn.style.opacity = '1';
                }
            });
        };
    }
    if (shareBtn) {
        shareBtn.style.display = 'none';
        shareBtn.style.opacity = '0';
    }
    quoteElement.style.display = 'none';
};

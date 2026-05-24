import TextRepulsion from './text-repulsion.js';

// function showFluidText() {
//   document.querySelector('.bootcamp-name-hero').classList.remove('bootcamp-name-hero-hide');
// }

// function hideFluidText() {
//   document.querySelector('.bootcamp-name-hero').classList.add('bootcamp-name-hero-hide');
// }

const ascii_art = {

  confidence_icon:
    `-------- |||||||
----------- ||||||||||
------------- ||||||||||||
--------------- ||||||||||||||
-----------            |||||||||||
|||||||||                  |||||||||
|||||||||     ..........      ||||||||
|||||||     ..............     |||||||
|||||||     ................     |||||||
||||||    ..................     |||||||
||||||     ..................     ||||||
******     ..................     ++++++
*******    ..................    +++++++
*******     ................     +++++++
********     ..............     ++++++++
********      ..........      ++++++++
*********                  +++++++++
**********            +++++++++++
"""""""""""""" +++++++++++++++
""""""""""""" +++++++++++++
""""""""""" +++++++++++
""""""" +++++++`,

  case_study:
    `      ###########                                  
   #################                               
  ###########################################      
  ##############################################   
  ####+.. ..      .  .      ..      .   . ..+####  
  ###     .  . .     ..          . . .   .    ###  
  ##-        .         .    .    .  .       . -##  
  ##--#######################################--##  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
  ###############################################  
   #############################################   
      #######################################`,
  bootcamp_name:
    `
                                ||||      ||                      ||
                                  ||                              ||
 ||||||   || ||||    || ||||      ||    ||||       |||||      ||| ||
      ||  ||||  ||   ||||  ||     ||      ||     ||    ||   ||   |||
 |||||||  ||    ||   ||    ||     ||      ||     ||||||||   ||    ||
||    ||  ||||  ||   ||||  ||     ||      ||     ||         ||   |||
 |||||||  || ||||    || ||||    ||||||  ||||||     ||||||     ||| ||
          ||         ||
          ||         ||

||     ||  ||      ||
||     ||    ||  ||  
||     ||      ||    
||   ||||    ||  ||  
 ||||| ||  ||      ||
                                ||||                  ||          ||
                                  ||                  ||
 ||||||   || ||||     ||||||      ||     ||    ||   ||||||      ||||     ||||||
      ||  ||||   ||        ||     ||     ||    ||     ||          ||    ||     
 |||||||  ||     ||   |||||||     ||     ||   |||     ||          ||    ||     
||    ||  ||     ||  |     ||     ||       ||| ||     ||   ||     ||    ||     
 |||||||  ||     ||   |||||||   ||||||         ||      ||||     ||||||   ||||||
                                         ||    ||
                                           |||||
                                           
Behavioral Decision-Making for Product Teams`,
  asciiIllus01:
    `++++
++++++
+++      ++++++++++      +++
++++++++++++++++++++++++++
++++++++++++++++++++++++++
++++++++++++++++++++++++
+++++++++++  +++++++++++
+++++++++   +  +   +++++++++
+++++++++++++        +++++++++++++
++++++++++                ++++++++++
+++++++++++++        +++++++++++++
+++++++++   +  +   +++++++++
+++++++++++  +++++++++++
++++++++++++++++++++++++
++++++++++++++++++++++++++
++++++++++++++++++++++++++
+++      ++++++++++      +++
++++++
++++`,
  asciiIllus02:
    `+
+
+
+
+++
+++
+++        +++        +++
+++      +++      +++
+++++   +++   +++++
+++++++++++++++
+++++++++++++
+++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++
+++++++++++++
+++++++++++++++
+++++   +++   +++++
+++      +++      +++
+++        +++        +++
+++
+++
+
+
+
+`,
  asciiIllus03:
    `        +++++++++++++++++++++++        
    ++++++++               ++++++++    
 ++++                             ++++ 
+++                                 +++
++                                   ++
+++                                 +++
  +++++                         +++++  
 +++++++++++++           +++++++++++++ 
  +++    +++++++++++++++++++++    +++  
   +++++                       +++++   
     +++++++++++++   +++++++++++++     
     ++   +++++++++++++++++++   ++     
     +++++                   +++++     
       +++++++++++++++++++++++++       
       ++   +++++++++++++++  +++       
        ++++++           ++++++        
         +++++++++++++++++++++         
          ++++++       ++++++          
            +++++++++++++++            
              +++++++++++              `,
  asciiIllus04:
    `                       +++++++++                       
                      +++++++++++                      
                    +++++++++++++++                    
                   +++++++++++++++++                   
                  +++++++++++++++++++                  
                 +++++++++++++++++++++                 
                +++++++++++++++++++++++                
               +++++++++++++++++++++++++               
              +++++++++++++++++++++++++++              
             +++++++++++++++++++++++++++++             
           +++++++++++++++++++++++++++++++++           
          +++++++++++++++++++++++++++++++++++          
       +++++++++++++++++++++++++++++++++++++++++       
++++++++++++++++++++++++++++++++++++++++++++++++++++++ `,
  asciiIllus05:
    `     ++++++++++++     +++++++++++   
  +++++++++++++++   ++++++++++++++  
 +++++++            ++++       ++++ 
++++               ++++         +++ 
+++++++++++++++++  ++++         ++++
+++++++++++++++++  ++++         ++++
++++               ++++         ++++
 ++++++            ++++         ++++
  +++++++++++++++  ++++         ++++
    +++++++++++++  ++++         ++++
    
                                   ++ 
 +++          +++      +++++++++++++
 +++          +++    ++++++++++++++ 
 +++          +++  +++++     ++++++ 
 +++          +++  ++++    +++++++++
 +++          +++  +++    ++++   +++
 +++          +++  ++++ +++++    +++
 ++++        ++++  ++++++++    +++++
  ++++      ++++    ++++++++++++++  
   ++++++++++++     +++++++++++++   
     ++++++++      ++++             `,

  asciiIllus06:
    `↘↘↘↘                            ↙↙↙↙
↘↘↘↘↘↘                        ↙↙↙↙↙↙
↘↘↘↘↘↘↘    ↘↘↘↘    ↙↙↙↙    ↙↙↙↙↙↙↙
↘↘↘↘↘↘↘  ↘↘↘↘    ↙↙↙↙  ↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙↙↙↙
↘↘↘↘↘↘↘↘↘↘↘↘    ↙↙↙↙↙↙↙↙↙↙↙↙


↗↗↗↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗↗↗↗↗    ↖↖↖↖↖↖↖↖↖↖↖
↗↗↗↗↗↗↗  ↗↗↗↗    ↖↖↖↖  ↖↖↖↖↖↖↖
↗↗↗↗↗↗↗    ↗↗↗↗    ↖↖↖↖    ↖↖↖↖↖↖↖
↗↗↗↗↗↗                        ↖↖↖↖↖↖
↗↗↗↗                            ↖↖↖↖`,
  asciiIllus07:
    `++++++++
+++++++++++
++++++++++++
++++++++++++
++++++++++
++++++++
+++++                    +++++
+++++++++                +++++++++
+++++++++++              +++++++++++
+++++++++++              +++++++++++
+++++++++++              +++++++++++
+++++++++                +++++++++
+++++                    +++++
++++++++
++++++++++
++++++++++++
++++++++++++
++++++++++
++++++++`,

  asciiIllus08:
    `++++++++++      ++++++++++
++++++++++      ++++++++++
+++                    +++
+++                    +++
++++                  ++++
+++++              +++++
+++              +++
++++              ++++
++++++++                ++++++++
++++++++                ++++++++
++++              ++++
+++              +++
+++++              +++++
++++                  ++++
+++                    +++
+++                    +++
++++++++++      ++++++++++
++++++++++      ++++++++++`,

  asciiIllus09:
    `              +++++                 
       ++++++++++++++++++++         
   ++++++    ++         +++++++     
  +++                     ++++++    
 ++++                          ++   
+++              ++++          +++  
++              +++++          ++++ 
++      ++++++++++             ++ ++
++++   +++                ++      ++
 +++  +++                 ++++   +++
  ++++++       ++        +++++++++  
       ++      ++++++++++++     ++  
        ++++++++++++++++       +++  
           +++  ++++++++++++++++    
                   +++  +++++       
                     +++++          
                       +++          `,



  portraitLight:
    `  .      .          .                   ..                    
    .                                  .         .            
          .             ..-+###*=+=:..               .        
        .      .    ...+@@@@@@@@@@%@@@@%#-.   . .             
     .             .-%@@@@@@%@@%%%@%@@%@@@%=..        .       
           ..    ..*@@@@@@@@%%%@@@@@@@@@@@@%+.           .    
   .  .       ....#@@@@@@@@@@@@@@@@%@@@@@@@@#:                
  .    .        .-@@@@@@@@@@%###*+==+*#%@%%%%:.          .    
                .+@@@@@@#+=----::....::-+#@@@%..      .     ..
                .+@@@@%*=---::::.......::-#@@#..              
        ..      .+@@@%*=----:::........::-*%@+..  .   .       
    .           .=@@@*+===--::.........::-=%%-.      .      . 
.               .:%@#**%%%%@%*-::.:=#%###+=%#..          .    
       .        ..#@#++++++++==-::-=+++=---#+.     .         .
     .   .     .:++%#+++*+*+-+=-..:-===-==-**-  .             
       .       .==+*#+==--------:.::::::::-+=:  .            .
                .+**#+=-:::::-=-:.::.....:-+-.                
         .      .-=**+=--::::==-:.:::....:--:.                
 .              . .=*+===-::-+=+=-=-:::::-=:.               . 
    .     ..        .++==--------:::.:::-=-                   
   .           .     :++===-----:::::::---.           .   .   
            .       . -+++=-+*++====---==..   .    .          
                   ..+#***+========---=:            .  .   .  
             .     -@@%#***==---::::--.. .                    
 .              .:#@@@%#***+++=---==+#-.     .             .. 
               :%@@*+@@%**+++++=====+%@*.                     
 .           .:%@#. .#@%#*++========+#@@@=..                  
         .:*%*-#@-   .@@##*+===----=+*@@@@@@#-.  .            
  ...-+*+-.  ..#@-    -@%***+=-----=+=+%@@@@@@@%-.      .     
=%%*:..       .*@=    .*@@*+++=--------=@@*%@@@@@@+%+.        
-.      .     .*@=.    :@#%@#=:::::::::*@%@.+@@@@@@*@+.       
        .  ....+@+.    .#%:.-@@%-:::.-%@:=@=.=@@@@+.*@+.      
            .#@@@+.     :@%.  .-+++=-:...-@%. =%*+. :%%-.   . 
  .       .. .#@#.      .*@*             .%%: .+: .  +@#. .   
.         .   :%@+..    .=@%:         .  .*@- .:#.  ..#@=     
        .      =@@:      :%@=             +@=. .%- .  -@%.    
 .            ..=@@: .   .*@=.  .         :@=.  *#. . .#@-    
.            .  .*@%:     .@*.            .%+.  -@=.  .=@*.   
      .       .  :%@+.    .#%. .       .   *+. ..@+  . .%*. . 
        . .      .%@#. .   -@. .           -*.   %*    .#*.   
                 .#@@..    :%-    .        :*.   *%..  .%*..  
Giảng viên     . .#@@=     .*#.       .   ..+..  =%.   .%*.   
                  .*@%     .+@.   ..       .=..  -%..  :@*.  .
Đỗ Minh Tâm  ›     .@.  .  .=@.  .          =.   :     +.     `,
  portraitDark:
    `                         .              .           .         
                   .  .  .-=+*#%%@@%#*+-.. .                  
                      .+@*.::-..=*:+%@@@@@@#.                 
    .    .         :*@*=+**+==++=-#+.:-*:+@@+               . 
          .  .   .@@---:=--::::-*+-*-=#-:==:#=..  .  ..       
       .  .      +@.-::..........:-:--:=-=*=:*-        ..  . .
  ..           .:@.*:::... .     .......-:-+=+@.       .      
               .#*:::..    .....::==-:...:=+-+@.              
               =@-:...  .:-==++*#%%%%#*+-:..-:#.        .     
   ..          :@:..   .--=++**#%%%%%%##*+..:.%.              
                *...  .:--=+**#%%@%%%%##*+:.::@.              
                -:.  ..::-=+*#%%%@@@%%%#*+-..=@.              
                .*.  ..   ....=###*-... ..:. #@.       .      
     .        . #+.  ........-:=##+-...:---..@= .          .  
               +=... ......-=--=##*+====--=.:=#   .           
       .      .@:-.. .:-=-==++--#%*######*+.-+@. .      .  .  
    .          =#. . .:=+****-:-*%**%%%%%#+.=#%               
                ==:. ..:=****::-*@#**%%%#*-=+@:    .. .     . 
                .-@-...::=++-...:-.-####+-.#@+.       .  . .. 
  .   .  .         .@...::-----=+**#%#*+-:.@:. .   . .        
           .        #*...::----=+**#***=-:@%.  . .           .
         .      .   -@=...:-:..::-=-+=-::@@:                  
.           .    ..#@=..  .:::::::-===:*@=       .            
                 -%*::...  .:-==+**++-@+                     .
         .     :%*:......  ....--::..-#@=      .    .         
       .     -%#:.. ..:..........:..::-*@@+                   
       .:*@@@@%-..  ...........:::::.::-*%@@%-     .  .       
   .=@@@@@%+=-::.. .  .:....:::---::..-:=+*+=+**.             
*@@@@%#++=-:..... .  ...::...::----:.:+*:=*+-:.:=#=%%:        
+=--::::...   ...  .   .:---:.:---=---==-:-++-...:++*@*     . 
..            ...   .  ..-----=+++###***--:-++-::-===*@=      
           ..:::..  .   .:-:...:-=+*#*+=-:::-**++=-:.-*@.. .  
           ..-==:...    ..-:..  ............:=**+=:...-#%     
.           ..-:.........:--..              .:++-..  ..=%#    
    .        ..:.......:::::..        . .   ..-=:.    .:+@.   
          ..  ....    .... ....           .  .:==.    ..=@=   
               ...   .     ....  .      .  .  .:=:.    .-#@.  
           .  .....  .      ...          .  . ..-=..   .:+@:  
     ..      .  .:..       ....                .:=-..  ..=@:  
         .      ..:.. .     ... .            . ..-=..  ..=@.  
                ..:.         ..                 .:-:.  ..-@. .
Giảng viên    .  .:. .       ..         .   .   .:-:.  ..=@.  
                ....    .    ..     .         . .:-:.  ..=%   
Đỗ Minh Tâm  ›   ....        ..                 .:-:.  .:+*   `,
}

// const applieduxanalyticIntroHeader = new SplitType('.bootcamp-section-header h2', {
//   types: 'words, chars'
// });

document.querySelectorAll('.asciiIllus').forEach((element) => {

  const asciiKey = element.getAttribute('data-img-src');
  const asciiText = ascii_art[asciiKey];

  element.innerHTML = buildAsciiHTML(asciiText);

});

function buildAsciiHTML(text) {

  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

    .split('\n')

    .map(line => {

      return `
                <div class="ascii-row">
                    ${line
          .split('')
          .map(char => {

            if (char === ' ') {
              return `<span class="ascii-char space">&nbsp;</span>`;
            }

            return `<span class="ascii-char character">${char}</span>`;

          })
          .join('')
        }
                </div>
            `;

    })

    .join('');
}

// ======================================

window.onload = () => {

  if (document.querySelector('#appliedUxAnalytic_hero_fluidCanvas')) {
    gsap.to('#appliedUxAnalytic_hero_fluidCanvas', {
      scrollTrigger: {
        trigger: '.applied-ux-analytic-container',
        start: 'top top',
        end: 'top top',
        toggleActions: 'play none none reset',
      },
      display: 'none',
    });
  }


  // Click-to-reveal: clicking .bootcamp-goal-card-above fades it out to show .bootcamp-goal-card-below
  document.querySelectorAll('.bootcamp-goal-card-above').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('clicked');
      if (card.getElementsByClassName('avoid-mouse')[0].dataset.avoid === "true") {
        card.getElementsByClassName('avoid-mouse')[0].dataset.avoid = 'false';
      } else {
        card.getElementsByClassName('avoid-mouse')[0].dataset.avoid = 'true';
      }
    });
  });

  if (document.querySelector('.ux-console')) {
    ScrollTrigger.create({
      trigger: ".ux-console",
      start: "top 80%",
      end: "top 80%",
      // markers: true,
      onEnter: () => {
        config.ASCII_COLOR = isDarkMode ? { r: 100, g: 100, b: 100 } : { r: 190, g: 190, b: 190 };
      },
      onEnterBack: () => {
        config.ASCII_COLOR = defaultConfig.ASCII_COLOR;
      },
    });

  }

  if (document.querySelector('.applied-ux-analytic-name-fluid.text')) {
    gsap.to('.applied-ux-analytic-name-fluid.text *', {
      opacity: 1,
      delay: "random(1, 3)",
      ease: "bounce.in",
      duration: 0.5,
      onStart: () => {

        if (document.querySelector('#appliedUxAnalytic_hero_fluidCanvas')) {
          randomSplats(16, 0, 1, 0.4, 0.6);
        }

      },
    });
  }

  let mm = gsap.matchMedia();

  mm.add("(max-width: 991px)", () => {
    document.querySelectorAll('.syllabus-container').forEach(container => {
      // On mobile, just ensure they are visible and have no scroll trigger show/hide
      gsap.set(container.querySelectorAll('.syllabus-ascii'), { opacity: 1 });
      container.getElementsByClassName('syllabus-ascii')[0].style.display = 'block';
      container.getElementsByClassName('syllabus-ascii')[0].style.position = 'relative';
    });
  });


  // Initialize interactive text repulsion
  window.textRepulsion = new TextRepulsion({
    radius: 200,               // Mouse influence radius
    repulsionStrength: 50,     // Strength of the "magnet"
    damping: 0.7,             // Friction (higher = more sluggish)
    returnForce: 0.2,          // Speed of returning to base position
  });
}

// dữ liệu bootcamp từ google sheet
fetch("https://script.google.com/macros/s/AKfycbwW79mfaIZX5DHGSV9jX2o95GDWxCK_GqVlWqTxwmV9ZxVO4RnJnDsCLxF_9HpVM-WZ/exec")
  .then(res => res.json())
  .then(data => {

    // listing trên phần giới thiệu bootcamp.
    const bootcamps = data.applied_ux_analytic.filter(item => item.listing == 1);
    const container = document.getElementById('appliedUxAnalytic_register_bootcampListContainer');
    const containerSignUp = document.getElementById('signUp_ux_analytic_bootcamp_list');

    if (!container && !containerSignUp) return;

    // Lấy giá trị của 'bootcamp_id'
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const selectedBootcamp = params.get('bootcamp_id');



    if (container) {
      container.innerHTML = '';

      bootcamps.forEach(item => {
        const col = document.createElement('div');
        item.is_open == 1 ? col.classList.add("open-bootcamp") : col.classList.add("closed-bootcamp");
        col.classList.add('col-12', 'col-md-6', 'col-lg-4');
        col.innerHTML = `
                <span class="mono-body reverse-color">${item.bootcamp_name}</span><br>
                <span class="mono-body reverse-color">${item.offline == 1 ? "Offline, " + item.location : "Online"}</span>
                <span class="mono-body reverse-color">${item.pricing}</span>
                <span class="mono-body reverse-color">${item.is_open == 1 ? "Đang mở đăng ký" : "Form closed"}</span>
                ${item.is_open == 1 ? `<a href="bootcamp-register.html?bootcamp_id=${item.bootcamp_id}" class="mono-body register-link button-reverse">Đăng ký ›</a>` : ''}
            `;

        container.appendChild(col);
      });
    };

    // listing trên phần đăng ký.
    if (containerSignUp) {
      containerSignUp.innerHTML = '';

      bootcamps.forEach(item => {
        if (item.is_open == 1) {
          const col = document.createElement('span');
          col.classList.add('sign-up-ux-analytic-bootcamp-item', 'col-12', 'col-md-6');
          col.innerHTML = `
                <label for="bootcamp_${item.bootcamp_id}">
                    <input required type="radio" name="bootcamp_name" value="${item.bootcamp_name}" id="bootcamp_${item.bootcamp_id}" ${item.bootcamp_id == selectedBootcamp ? "checked" : ""} />
                    <div class="bootcamp-item-content">
                      <span class="mono-body reverse-color">[<span class="is_selected">•</span>]
                          ${item.bootcamp_name}
                      </span>
                      <span class="mono-body reverse-color">${item.offline == 1 ? "Offline, " + item.location : "Online"}</span>
                      <span class="mono-body reverse-color">${item.pricing}</span>
                    </div>
                </label>
            `;
          containerSignUp.appendChild(col);
        }
      });
    };

  });
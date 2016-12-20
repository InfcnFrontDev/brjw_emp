;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-yonghu" viewBox="0 0 1000 1000">' +
    '' +
    '<path d="M324.5882 376.4018c0 18.0807 13.8432 32.7328 30.8743 32.7328 0.1939 0 0.3628-0.013 0.5447-0.013 6.3899 86.3265 74.3986 172.7169 157.4687 172.7169 83.0441 0 151.0528-86.3904 157.4557-172.7169 0.1819 0 0.3508 0.013 0.5447 0.013 17.0451 0 30.8753-14.6531 30.8753-32.7328 0-13.3689-7.5172-24.8002-18.2893-29.9007 6.248-19.4088 9.6698-40.1468 9.6698-61.7781 0-105.5864-80.6846-191.2004-180.2552-191.2004s-180.2562 85.614-180.2562 191.2004c0 21.6313 3.4348 42.3693 9.6688 61.7781C332.1054 351.6016 324.5882 363.0329 324.5882 376.4018zM908.1145 781.6201c-73.5961-71.4665-163.4699-121.9373-260.1113-146.018-2.4364-1.3351-5.1847-2.0736-8.0359-2.0736h-8.762418339517728c-2.7732 0-5.4955 0.6995-7.9329 2.0216-29.1894 15.6314-69.2139 24.6263-109.7961 24.6263-40.5961 0-80.6077-8.9949-109.823-24.6523-2.4634-1.2961-5.1847-1.9956-7.9459-1.9956h-6.363946166292072c-1.3212 0-2.6043 0.1689-3.8615 0.4537C286.2996 657.4542 194.1173 708.4946 118.8373 781.6201c-3.2669 3.1629-5.1067 7.4919-5.1067 12.0278v60.04828726123688c0 9.2407 7.5172 16.7846 16.7983 16.7846h765.8941254420934c9.2811 0 16.7993-7.5439 16.7993-16.7846v-60.04828726123688C913.2213 789.112 911.3685 784.7559 908.1145 781.6201z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-meun" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M62.95126 107.46557 62.95126 248.349251l892.295096 0L955.246356 107.46557 62.95126 107.46557zM62.95126 577.076134l892.295096 0L955.246356 436.1945 62.95126 436.1945 62.95126 577.076134zM62.95126 905.801994l892.295096 0L955.246356 764.92036 62.95126 764.92036 62.95126 905.801994z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-home" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1024 590.432l-512-397.44-512 397.44 0-162.048 512-397.44 512 397.44zM896 576l0 384-256 0 0-256-256 0 0 256-256 0 0-384 384-288z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-icon_nav" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M0.021 109.446h158.037v160.883h-158.037v-160.883z"  ></path>' +
    '' +
    '<path d="M256.305 109.446h767.673v160.883h-767.673v-160.883z"  ></path>' +
    '' +
    '<path d="M0.021 429.619h158.037v160.883h-158.037v-160.883z"  ></path>' +
    '' +
    '<path d="M256.305 429.619h639.775v160.883h-639.775v-160.883z"  ></path>' +
    '' +
    '<path d="M0.021 748.016h158.037v160.883h-158.037v-160.883z"  ></path>' +
    '' +
    '<path d="M256.305 748.016h703.22v160.883h-703.22v-160.883z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-map" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M509.386988 64.716954c107.877963 0 195.619306 87.739297 195.619306 195.622376 0 28.463262-6.795776 57.049321-20.330024 84.943624l-2.221598 4.701069-2.733251 4.254907c-4.830005 8.771781-10.16757 17.026792-18.745946 28.528754L510.084882 614.921068 338.863243 353.222787l-5.148253-10.481725-5.718235-8.767688c-9.465582-23.3805-14.232143-48.096415-14.232143-73.634044C313.765635 152.456251 401.503908 64.716954 509.386988 64.716954M509.386988 6.139837c-140.41296 0-254.199493 113.786533-254.199493 254.200516 0 39.452547 9.021467 76.872808 25.032116 110.22952 0.061398 0.065492 0.192382 0.12689 0.192382 0.25378l229.798756 351.281575 199.878307-307.443138c7.751544-10.165524 14.675234-20.838607 20.904099-32.148188l7.624654-11.69025-1.269923 0c16.264429-33.545 26.237571-70.714552 26.237571-110.4833C763.585457 119.92637 649.793808 6.139837 509.386988 6.139837L509.386988 6.139837z"  ></path>' +
    '' +
    '<path d="M515.103176 401.828808c-71.66725 0-129.926118-58.32436-129.926118-129.990586 0-71.666226 58.258868-129.989563 129.926118-129.989563 71.666226 0 129.993656 58.32436 129.993656 129.989563C645.096832 343.504448 586.769402 401.828808 515.103176 401.828808zM515.103176 200.425775c-39.326681 0-71.346955 32.021298-71.346955 71.412446 0 39.391149 32.021298 71.412446 71.346955 71.412446 39.390125 0 71.411423-32.021298 71.411423-71.412446C586.514599 232.448096 554.493302 200.425775 515.103176 200.425775z"  ></path>' +
    '' +
    '<path d="M656.148539 1012.705769c-2.665713 0-5.337565-0.376577-7.941879-1.13894L350.741781 927.377382 41.585629 993.328443c-8.767688 1.647523-17.596773-0.315178-24.523533-5.9055-6.862291-5.528923-10.862395-13.916964-10.862395-22.748097L6.199701 423.429779c0-9.846252 4.951779-19.060101 13.216-24.462135l120.837112-79.606059c13.407358-8.833179 31.578206-5.082762 40.538275 8.324596 8.894577 13.530155 5.14416 31.701003-8.324596 40.59558L64.773747 439.186647l0 489.337861 280.885272-59.914578c4.574179-1.016143 9.591449-0.947582 14.042831 0.508583l296.383244 83.864036 303.437917-87.545892L959.523011 363.835496l-119.128191 48.667419c-14.862499 6.164397-32.021298-1.082658-38.181601-16.07614-6.099928-14.927991 1.077541-32.021298 16.072047-38.181601l159.473061-65.120137c8.958022-3.689019 19.250436-2.672876 27.382651 2.794649 8.066723 5.459339 12.960173 14.608719 12.960173 24.331151L1018.101151 887.485837c0 13.023618-8.640798 24.520463-21.157879 28.139897l-332.664565 95.941096C661.615041 1012.329193 658.88179 1012.705769 656.148539 1012.705769z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-icon" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M372.936781 330.580091c112.01826-93.319385 196.280362-117.616768 272.201495-170.868599C757.794056 80.697927 802.74892 16.84976 802.74892 16.84976s-17.543561 44.536332-24.882714 134.458341c-9.249665 113.246227-0.354064 275.100522-53.266158 453.783087-30.277584 102.251825-161.539116 307.847344-390.739239 235.301074-0.110517-56.048527 27.768437-182.318372 312.590368-392.160611-27.167756-2.12336-59.690474 0.448208-117.218702 0 23.937179-73.844845 83.667561-159.399383 117.218702-196.081841-112.228037 54.108339-255.264754 179.856297-312.590368 274.516214 18.435884-0.054235 87.275739-0.545422 117.221772 0C212.663494 714.567555 294.78791 997.255893 294.78791 997.255893s-99.17065-237.942227-72.706929-417.369759C236.918921 479.301274 285.111526 403.746484 372.936781 330.580091z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-system" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M525.888 615.872 504.576 538.88c12.416-9.408 23.872-19.904 34.24-31.424l83.264 19.712c10.24 2.496 20.864-2.496 24.896-11.584l33.088-73.536c4.096-9.152 0.32-19.776-8.832-24.832l-73.408-40.512c0.832-7.872 1.28-15.872 1.28-23.744 0-6.848-0.32-13.76-1.024-20.608l73.92-41.216c9.024-4.992 12.8-15.488 8.768-24.576l-32.32-73.728c-4.032-9.216-14.784-14.208-25.088-11.712L541.056 201.216c-10.368-11.904-21.952-22.784-34.624-32.64l21.888-76.864c2.752-9.6-2.56-19.584-12.352-23.424l-78.848-30.848c-9.792-3.84-21.12-0.32-26.56 8.192l-43.52 68.544c-15.744-1.472-32.128-1.536-48.256-0.192l-43.2-68.928c-5.376-8.512-16.64-12.096-26.432-8.384l-79.168 30.208c-9.856 3.776-15.232 13.824-12.544 23.424l21.632 76.736c-12.864 9.728-24.704 20.672-35.328 32.64l-82.048-20.8c-10.24-2.624-21.12 2.304-25.216 11.52l-33.024 73.6c-4.16 9.216-0.256 19.904 9.024 24.896l73.28 39.36c-0.896 8-1.344 16.32-1.344 24.832 0 7.04 0.32 14.08 1.024 20.992l-73.856 40.832c-9.088 5.056-12.864 15.488-8.832 24.64l32.32 73.664c4.032 9.28 14.848 14.208 25.216 11.712l81.728-20.416c10.24 11.776 21.568 22.528 33.984 32.256l-20.992 78.08c-2.56 9.536 2.688 19.328 12.416 23.104l78.784 30.784c9.728 3.84 21.12 0.32 26.496-8.128l44.032-68.544c15.808 1.408 31.68 1.472 47.232 0.192l43.968 68.992c3.968 6.144 11.008 9.728 18.304 9.728 2.688 0 5.44-0.448 8.064-1.472l78.912-30.208C523.2 635.456 528.512 625.472 525.888 615.872zM459.84 536.128l20.16 72.896-44.8 17.152-41.728-65.344c-3.904-6.08-10.816-9.664-18.304-9.664-1.024 0-2.176 0.064-3.2 0.192-20.544 2.88-41.92 2.752-62.976-0.192-8.448-1.216-17.216 2.56-21.632 9.408l-41.6 64.896-44.928-17.536 19.84-73.92c2.112-7.744-1.024-15.936-7.872-20.736-17.344-12.096-32.576-26.624-45.312-43.008-5.184-6.72-14.272-9.664-22.72-7.552l-77.376 19.264-18.24-41.6 69.952-38.656c7.488-4.096 11.52-12.096 10.24-20.032-1.472-9.28-2.304-18.816-2.304-28.544 0-11.2 0.896-21.952 2.752-31.936 0.192-1.088 0.256-2.368 0.256-3.456 0-7.104-4.032-13.696-10.688-17.216l-69.312-37.248 18.496-41.344 77.696 19.712c8.448 2.176 17.472-0.768 22.656-7.424 13.184-16.64 28.928-31.232 46.784-43.2 7.104-4.8 10.432-13.184 8.128-21.184l-20.48-72.64 44.8-17.088 40.832 65.216c4.416 6.976 12.928 10.816 21.504 9.6 21.248-2.88 43.328-2.816 64.32 0.32 8.576 1.344 17.28-2.496 21.696-9.472l41.216-64.896 44.672 17.408L461.696 170.944c-2.24 7.872 0.896 16.192 7.936 21.12 17.664 12.224 33.152 26.816 45.952 43.392 5.184 6.656 14.208 9.6 22.592 7.552l77.888-18.944 18.368 41.792-70.016 39.04c-7.424 4.096-11.456 12.032-10.176 20.032 1.472 9.344 2.24 18.752 2.24 28.096 0 10.432-0.832 20.864-2.624 31.04-1.408 8.064 2.688 16.064 10.176 20.224l69.504 38.336-18.752 41.792L535.936 465.856c-8.256-1.92-17.088 0.896-22.272 7.296-12.992 16.128-28.416 30.272-45.696 41.92C460.864 519.872 457.664 528.192 459.84 536.128z"  ></path>' +
    '' +
    '<path d="M432 268.736c-24.064-22.528-56.128-34.88-90.24-34.88-34.112 0-66.176 12.352-90.304 34.88-24.128 22.528-37.44 52.48-37.44 84.288 0 31.872 13.312 61.76 37.44 84.288C275.584 459.84 307.648 472.256 341.76 472.256l0 0c34.112 0 66.176-12.416 90.304-34.88 24.128-22.528 37.44-52.416 37.44-84.288C469.44 321.216 456.128 291.264 432 268.736zM401.92 409.28c-16.064 14.976-37.44 23.296-60.16 23.296-22.72 0-44.096-8.256-60.16-23.296-16.064-14.976-24.96-34.944-24.96-56.192 0-21.248 8.832-41.216 24.96-56.192 16.064-14.976 37.44-23.296 60.224-23.296 22.72 0 44.096 8.256 60.16 23.296 16.064 15.04 24.896 34.944 24.896 56.192C426.88 374.272 418.048 394.24 401.92 409.28z"  ></path>' +
    '' +
    '<path d="M1022.464 720.192c-0.064-9.92-8-18.24-18.56-19.584l-56.576-6.848c-1.6-4.352-3.328-8.704-5.312-13.056-1.6-3.648-3.456-7.104-5.312-10.56l33.984-43.584c6.144-8 5.184-18.944-2.304-25.856l-43.392-39.936c-7.616-6.976-19.52-7.68-27.968-1.536l-45.056 32.448c-8.512-3.968-17.344-7.296-26.368-10.048l-8.192-52.736c-1.536-9.792-10.496-17.024-21.12-17.024 0 0-0.064 0-0.128 0l-61.056 0.384c-10.624 0.064-19.584 7.424-20.928 17.28l-7.552 52.864C702.144 583.936 697.536 585.6 692.736 587.456c-4.096 1.664-7.936 3.392-11.712 5.184l-46.08-31.808c-8.576-5.888-20.416-5.056-27.84 1.984l-42.88 40.576c-7.488 7.104-8.192 18.304-1.6 26.176l34.88 41.792c-4.288 8.064-8 16.448-10.816 25.024l-56.32 7.296c-10.56 1.344-18.432 9.856-18.368 19.84l0.448 57.024c0.064 9.984 8.128 18.432 18.752 19.584l56.064 6.208c1.6 4.544 3.456 9.088 5.504 13.632 1.664 3.712 3.52 7.296 5.44 10.816l-33.984 43.328c-6.272 8-5.312 18.944 2.24 25.856l43.392 39.936c7.616 6.976 19.648 7.616 28.032 1.472l44.48-32.576c8.384 3.968 17.024 7.232 25.92 9.984l9.152 53.312c1.664 9.6 10.56 16.704 20.992 16.704 0 0 0.064 0 0.128 0l61.056-0.384c10.624-0.064 19.52-7.424 20.928-17.216l7.744-53.056c4.608-1.472 9.216-3.072 13.568-4.864 3.968-1.536 7.744-3.264 11.456-4.992l46.656 31.68c8.512 5.824 20.224 4.864 27.648-2.112l42.816-40.512c7.488-7.04 8.192-18.24 1.664-26.048l-34.752-42.112c4.096-7.68 7.616-15.68 10.496-23.872l56.96-8.384c10.368-1.472 18.048-9.92 17.92-19.776L1022.464 720.192zM928 768c-8.448 1.28-15.36 7.104-17.408 14.912-3.456 13.376-9.088 26.112-16.704 37.888-4.48 6.976-3.968 15.936 1.408 22.4l31.936 38.656-16.896 16-42.816-29.12c-7.04-4.8-16.448-5.12-23.872-0.832-5.824 3.392-11.84 6.336-18.432 8.96-6.784 2.688-13.888 4.992-21.184 6.656-1.472 0.384-3.008 0.896-4.352 1.536-6.336 2.88-10.688 8.576-11.648 15.104l-7.04 48.64-24.32 0.128-8.32-48.896c-1.344-7.872-7.68-14.208-15.936-16.128-14.528-3.328-28.288-8.64-40.96-15.808-3.392-1.856-7.168-2.816-11.008-2.816-4.608 0-9.28 1.408-13.12 4.224l-40.896 29.888-16.896-15.616 31.168-39.872c5.184-6.528 5.504-15.36 0.896-22.272-3.584-5.312-6.784-11.136-9.6-17.28-3.264-7.04-5.76-14.016-7.488-20.736C624.256 782.144 623.616 780.608 622.912 779.2c-3.2-5.952-9.408-9.984-16.512-10.816l-51.456-5.696-0.192-22.08 51.648-6.72c8.704-1.088 15.808-7.168 17.792-15.104 3.456-13.76 9.152-26.88 17.024-39.04 4.544-7.04 3.968-16-1.408-22.464l-32-38.4 16.832-15.936 42.304 29.184c6.976 4.864 16.384 5.248 23.808 0.96 5.824-3.392 12.096-6.4 18.944-9.216 7.424-2.88 14.464-5.12 21.504-6.72 8.512-1.92 14.912-8.576 16.064-16.704l6.848-48.576 24-0.128 7.488 48.32c1.28 8.064 7.616 14.592 16.128 16.448 14.656 3.328 28.672 8.64 41.472 15.872 7.552 4.16 17.024 3.712 24-1.344l41.28-29.76 17.088 15.68-31.168 40.064c-5.056 6.528-5.44 15.232-0.896 22.144 3.52 5.312 6.72 11.072 9.472 17.088 3.136 6.912 5.568 13.504 7.296 20.16 2.112 8 9.28 13.888 17.92 14.976l51.968 6.336 0.128 22.528L928 768z"  ></path>' +
    '' +
    '<path d="M799.168 676.608c-10.176-3.776-20.8-5.696-31.68-5.696-35.008 0-66.048 19.52-79.04 49.856-17.408 40.64 3.776 86.976 47.296 103.36 10.176 3.776 20.8 5.696 31.616 5.696 35.008 0 66.048-19.584 79.04-49.856C854.912 760.256 854.656 738.688 845.76 719.104 836.8 699.648 820.288 684.544 799.168 676.608zM806.912 765.184c-8.512 19.84-33.792 30.144-55.296 22.08-21.76-8.192-32.384-31.36-23.744-51.712 6.592-15.168 22.08-24.96 39.616-24.96 5.44 0 10.752 0.96 15.808 2.88 10.56 3.968 18.816 11.52 23.296 21.248C811.072 744.512 811.2 755.328 806.912 765.184z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-table" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M329.142857 786.285714l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM329.142857 566.857143l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM621.714286 786.285714l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM329.142857 347.428571l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM621.714286 566.857143l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM914.285714 786.285714l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM621.714286 347.428571l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM914.285714 566.857143l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM914.285714 347.428571l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM987.428571 164.571429l0 621.714286q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-768 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-621.714286q0-37.741714 26.843429-64.585143t64.585143-26.843429l768 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-exit" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M984.576 551.36c0 64-12.544 125.12-37.568 183.36-25.024 58.24-58.688 108.48-100.928 150.784-42.24 42.304-92.544 75.904-150.784 100.992C637.056 1011.52 575.936 1024 511.936 1024s-125.12-12.48-183.36-37.504c-58.24-25.024-108.48-58.688-150.784-100.992-42.24-42.24-75.904-92.544-100.992-150.784-25.024-58.24-37.504-119.36-37.504-183.36 0-74.624 16.512-145.024 49.6-211.072C121.92 274.304 168.384 218.88 228.288 174.208c17.664-13.12 37.248-18.304 58.752-15.424 21.504 2.88 38.656 13.184 51.328 30.784 13.12 17.216 18.176 36.608 15.104 58.176C350.464 269.312 340.288 286.656 323.072 299.776c-40.192 30.336-71.296 67.456-93.248 111.36C207.872 455.04 196.928 501.76 196.928 551.424c0 42.688 8.256 83.392 24.896 122.176 16.64 38.784 39.104 72.32 67.392 100.608 28.288 28.288 61.824 50.752 100.608 67.392C428.608 858.176 469.312 866.56 512 866.56c42.688 0 83.392-8.32 122.176-24.96 38.784-16.576 72.384-39.104 100.608-67.392 28.352-28.288 50.752-61.824 67.392-100.608 16.64-38.784 24.896-79.488 24.896-122.176 0-49.664-10.944-96.448-32.896-140.288-21.888-43.904-52.992-81.024-93.184-111.36-17.216-13.12-27.392-30.464-30.464-51.968-3.072-21.568 1.92-40.96 15.104-58.176 12.736-17.664 29.952-27.904 51.712-30.784 21.76-2.88 41.216 2.304 58.432 15.424 59.84 44.672 106.368 100.096 139.392 166.144 33.024 66.048 49.6 136.448 49.6 211.072L984.576 551.488zM590.656 78.784l0 393.856c0 21.312-7.808 39.808-23.424 55.424C551.68 543.552 533.184 551.36 511.872 551.424c-21.312 0-39.808-7.744-55.36-23.36C440.896 512.448 433.088 493.952 433.088 472.64L433.088 78.784c0-21.376 7.808-39.808 23.424-55.36C472.128 7.808 490.56 0 511.872 0 533.184 0 551.68 7.744 567.232 23.424 582.848 39.04 590.656 57.472 590.656 78.784z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-page" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M119.058606 512.12996c0.001023-135.579885-0.004093-271.15977 0.00614-406.739655 0.002047-23.065322 10.79895-40.358173 31.028691-48.221258 5.882987-2.287089 12.607132-3.369747 18.947538-3.377934 152.292522-0.182149 304.586067-0.430812 456.877565 0.081864 33.147958 0.11154 62.376653 13.093203 85.977163 36.353976 52.470025 51.714825 104.585987 103.795994 156.279323 156.286486 23.907503 24.276916 36.559661 54.277184 36.605709 88.463798 0.261966 194.756659 0.128937 389.514341 0.134053 584.272024 0.001023 30.166043-20.87954 51.163263-51.100842 51.166333-228.013087 0.021489-456.026174 0.023536-684.038238-0.00307-29.764907-0.00307-50.706869-21.118993-50.710962-51.03228C119.046327 783.630491 119.057583 647.880737 119.058606 512.12996zM184.869474 119.230522c0 262.176165 0 523.847839 0 785.531793 218.293725 0 436.178127 0 654.335752 0 0-174.632319 0-348.983229 0-523.759835-2.311649 0-4.322445 0-6.333242 0-68.217684 0-136.434346 0.00921-204.65203-0.004093-29.614481-0.00614-50.705845-20.9788-50.713009-50.480718-0.017396-69.070098 0.01228-138.140197 0.008186-207.209272 0-1.303692-0.184195-2.608407-0.295735-4.077875C446.317045 119.230522 315.738058 119.230522 184.869474 119.230522zM835.208193 315.361481c-2.804882-8.720615-6.535857-16.416901-12.8384-22.716374-52.190663-52.169173-104.366999-104.352673-156.545382-156.535149-6.291287-6.29231-13.979386-10.04068-22.611997-12.703323 0 64.11218 0 127.905088 0 191.95587C707.211007 315.361481 770.894422 315.361481 835.208193 315.361481z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-zhuzhuangtutubiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M256 448 128 448C92.608 448 64 476.608 64 512l0 320c0 35.392 28.608 64 64 64l128 0c35.392 0 64-28.608 64-64L320 512C320 476.608 291.392 448 256 448zM256 832 128 832 128 512l128 0L256 832zM896 320l-128 0c-35.392 0-64 28.608-64 64l0 448c0 35.392 28.608 64 64 64l128 0c35.392 0 64-28.608 64-64L960 384C960 348.608 931.392 320 896 320zM896 832l-128 0L768 384l128 0L896 832zM576 64 448 64C412.608 64 384 92.608 384 128l0 704c0 35.392 28.608 64 64 64l128 0c35.392 0 64-28.608 64-64L640 128C640 92.608 611.392 64 576 64zM576 832 448 832 448 128l128 0L576 832z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-html" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M919.415066 901.492615l-81.669546 0 0 20.418409c0 56.367563-45.69075 102.088976-102.086932 102.088976L102.713477 1024c-56.366541 0-102.086932-45.720391-102.086932-102.088976L0.626545 105.208413c0-56.397204 45.720391-102.087954 102.086932-102.087954l408.351817 0 37.693872 0 0-3.120459 2.873111 3.120459 0.268811 0 0 0.308673 282.763835 305.954167 3.081619 0 0 3.349408 1.405382 1.505547-1.405382 0 0 240.154704 81.669546 0c56.398226 0 102.088976 45.691772 102.088976 102.089998l0 142.922727C1021.504042 855.774269 975.813292 901.492615 919.415066 901.492615M551.900066 76.396553l0 130.898792c0 56.367563 45.719369 102.087954 102.088976 102.087954l117.728065 0L551.900066 76.396553zM796.911769 350.220116 613.153247 350.220116c-56.367563 0-102.087954-45.720391-102.087954-102.087954L511.065293 43.956253 143.549272 43.956253c-56.367563 0-102.086932 45.69075-102.086932 102.087954l0 735.031021c0 56.366541 45.719369 102.088976 102.086932 102.088976l551.273521 0c49.370295 0 90.574045-35.061976 100.023321-81.670568L245.636204 901.493637c-56.367563 0-102.087954-45.718347-102.087954-102.08591L143.54825 656.483978c0-56.398226 45.720391-102.089998 102.087954-102.089998l551.274544 0L796.910747 350.220116zM661.255122 827.988593l34.095073 0 34.81565-138.057551 0 138.057551 32.899221 0L763.065066 652.605125l-53.1081 0L678.49379 772.247575l-31.834197-119.64245-53.006912 0 0 175.383469 32.918641 0L626.571322 689.931042 661.255122 827.988593zM565.189356 682.274523l0-29.668376L425.825567 652.606147l0 29.668376 52.02059 0 0 145.714071 35.402333 0L513.24849 682.274523 565.189356 682.274523zM290.81795 721.634411l0-69.029286-35.402333 0 0 175.383469 35.402333 0 0-76.684784 69.397241 0 0 76.684784 35.411532 0L395.626723 652.605125l-35.411532 0L360.215191 721.634411 290.81795 721.634411zM928.786662 798.437758l-88.041291 0L840.745371 654.048324l-35.420731 0 0 173.940269 123.462022 0L928.786662 798.437758zM288.225915 125.765826l29.061251 0-50.516065 384.873253-28.502164 0L288.225915 125.765826zM475.62412 350.967268 337.127068 462.147787l0-71.850271 96.644272-70.075913-96.644272-69.268457 0-71.341267L475.62412 290.023782 475.62412 350.967268zM80.073032 289.514778l138.326362-110.422124 0 72.337811-96.495046 68.031721 96.495046 70.584916 0 71.810409L80.073032 350.967268 80.073032 289.514778z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-edit" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M798.24228 958.362071 222.63152 958.362071c-52.893674 0-95.935979-43.042305-95.935979-95.935979l0-639.566374c0-52.889581 43.042305-95.930863 95.935979-95.930863l447.693392 0c17.682731 0 31.980365 14.326287 31.980365 31.976272 0 17.653055-14.297634 31.979342-31.980365 31.979342L222.63152 190.884468c-17.620309 0-31.980365 14.354939-31.980365 31.975249l0 639.566374c0 17.654079 14.360056 31.979342 31.980365 31.979342l575.61076 0c17.647939 0 31.974225-14.325263 31.974225-31.979342L830.216505 350.776062c0-17.654079 14.297634-31.979342 31.981389-31.979342 17.682731 0 31.974225 14.325263 31.974225 31.979342l0 511.650029C894.172119 915.320789 851.129814 958.362071 798.24228 958.362071L798.24228 958.362071zM798.24228 958.362071"  ></path>' +
    '' +
    '<path d="M610.365308 446.712041c-8.18645 0-16.369829-3.137457-22.605857-9.373485-12.506848-12.501732-12.506848-32.712029 0-45.212738L905.556401 74.323752c12.505825-12.506848 32.716122-12.506848 45.217854 0 12.506848 12.500709 12.506848 32.712029 0 45.217854L632.977305 437.338556C626.742301 443.609377 618.553805 446.712041 610.365308 446.712041L610.365308 446.712041zM610.365308 446.712041"  ></path>' +
    '' +
    '<path d="M478.459093 446.712041 286.586111 446.712041c-17.654079 0-31.980365-14.326287-31.980365-31.980365 0-17.653055 14.326287-31.979342 31.980365-31.979342l191.871959 0c17.647939 0 31.974225 14.326287 31.974225 31.979342C510.433318 432.385754 496.107031 446.712041 478.459093 446.712041L478.459093 446.712041zM478.459093 446.712041"  ></path>' +
    '' +
    '<path d="M670.324912 638.579907 286.586111 638.579907c-17.654079 0-31.980365-14.292518-31.980365-31.976272 0-17.687848 14.326287-31.980365 31.980365-31.980365l383.738801 0c17.682731 0 31.980365 14.292518 31.980365 31.980365C702.305277 624.286366 688.007643 638.579907 670.324912 638.579907L670.324912 638.579907zM670.324912 638.579907"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-excel" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M624.256 544l224 0 0 64-224 0 0-64Z"  ></path>' +
    '' +
    '<path d="M624.256 416l224 0 0 64-224 0 0-64Z"  ></path>' +
    '' +
    '<path d="M624.256 672l224 0 0 64-224 0 0-64Z"  ></path>' +
    '' +
    '<path d="M49.536 302.016l0 512 512.064 0 0-512L49.536 302.016zM375.232 703.936 305.6 599.808l-31.36 46.912 31.36 0 0 57.216-157.44 0 114.304-168.384L161.216 384 245.76 384l59.904 88.128L365.504 384l84.48 0L348.608 535.488l114.368 168.448L375.232 703.936z"  ></path>' +
    '' +
    '<path d="M926.144 202.176l-121.856-121.92C777.728 53.76 725.376 32 687.808 32L278.336 32c-37.568 0-68.224 30.72-68.224 68.224l0 137.728 54.592 0L264.704 100.224c0-7.424 6.336-13.632 13.696-13.632l409.472 0c4.032 0 8.704 0.512 13.632 1.472l0 216.896 216.96 0c0.96 4.928 1.472 31.872 1.472 36.032l0 582.72c0 7.424-6.336 13.632-13.696 13.632L278.336 937.344c-7.424 0-13.696-6.336-13.696-13.632l0-45.76L210.048 877.952l0 45.76c0 37.568 30.656 68.224 68.224 68.224l627.904 0c37.568 0 68.224-30.656 68.224-68.224L974.4 341.056C974.464 303.488 952.704 228.672 926.144 202.176zM756.032 250.432 756.032 110.976c3.712 2.56 6.912 5.248 9.536 7.936l121.856 121.856c2.688 2.688 5.376 5.952 8 9.664L756.032 250.432z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-nav" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M64 192l160 0 0 104-160 0 0-104Z"  ></path>' +
    '' +
    '<path d="M384 192l576 0 0 104-576 0 0-104Z"  ></path>' +
    '' +
    '<path d="M64 460l160 0 0 104-160 0 0-104Z"  ></path>' +
    '' +
    '<path d="M384 460l576 0 0 104-576 0 0-104Z"  ></path>' +
    '' +
    '<path d="M64 728l160 0 0 104-160 0 0-104Z"  ></path>' +
    '' +
    '<path d="M384 728l576 0 0 104-576 0 0-104Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-13" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M801.292136 1024H222.7009C151.697642 1024 94.128939 966.709878 94.128939 896.026988V128.195877C94.128939 57.512987 151.697642 0.222865 222.7009 0.222865h385.729812c43.019826-0.682523 60.152539 0.912352 64.289463 0.912351V0.222865L929.871061 256.161925v639.865063c0 70.68289-57.568703 127.973012-128.578925 127.973012zM672.720175 64.205889v127.973012c0 35.330998 28.777387 63.983024 64.282498 63.983024h128.578925L672.720175 64.205889z m192.861423 255.946025H737.002673c-71.010222 0-128.571961-57.290122-128.571961-127.973013 0 0-1.497371-51.356353-0.912352-127.973012H222.7009c-35.505111 0-64.289463 28.645061-64.289463 63.989988v767.831111c0 35.337963 28.784352 63.989989 64.289463 63.989988h578.591236c35.505111 0 64.289463-28.652026 64.289462-63.989988V320.151914z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-word" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M624.128 543.744h223.744v64h-223.744V543.744zM624.128 415.744h223.744V480.256h-223.744v-64.512zM624.128 671.744h223.744v64h-223.744V671.744z" fill="" ></path>' +
    '' +
    '<path d="M926.208 202.24l-121.856-121.856c-26.624-26.624-78.848-48.128-116.736-48.128h-409.6c-37.376 0-68.096 30.72-68.096 68.096v137.728h54.784v-137.728c0-7.168 6.144-13.824 13.824-13.824h409.6c4.096 0 8.704 0.512 13.824 1.536v217.088h217.088c1.024 5.12 1.536 31.744 1.536 35.84V923.648c0 7.168-6.144 13.824-13.824 13.824H278.528c-7.68 0-13.824-6.144-13.824-13.824v-45.568H209.92v45.568c0 37.376 30.72 68.096 68.096 68.096H906.24c37.376 0 68.096-30.72 68.096-68.096V340.992c0-37.376-21.504-112.128-48.128-138.752z m-169.984 48.128v-139.264c3.584 2.56 7.168 5.12 9.728 7.68L887.296 240.64c2.56 2.56 5.12 6.144 8.192 9.728h-139.264z" fill="" ></path>' +
    '' +
    '<path d="M49.664 302.08V814.08h512V302.08h-512z m345.6 367.616H343.04c-17.408-58.88-29.184-98.816-35.84-119.808 0-1.024-0.512-2.048-1.536-3.584-2.048-11.776-3.072-20.48-3.072-25.6h-1.536c0 1.536-0.512 4.096-1.536 7.68-1.024 9.216-2.56 16.384-5.12 21.504-7.68 21.504-20.48 61.44-39.424 119.808h-52.224L121.856 474.112h55.808c22.016 64.512 36.352 106.496 44.032 124.928 2.048 6.656 4.096 14.336 6.656 23.04 2.048-8.704 4.096-16.384 6.656-23.04 8.704-25.6 21.504-67.072 37.376-124.928h55.808c22.016 73.216 33.792 114.688 35.84 124.928 2.048 6.656 4.096 14.336 6.656 23.04 2.048-8.704 4.096-16.384 6.656-23.04 9.728-25.6 26.112-67.072 49.152-124.928h55.808l-87.04 195.584z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-logo1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M508.604327 1.758043s-57.50969 74.271308-49.441956 191.193227c0 0-6.165193 94.428598 54.956914 180.58476 0 0 37.545061-31.608655 51.139793-180.608843 0 0 2.33603-121.979304-56.654751-191.169144zM683.047977 138.837253s-55.78777 62.819944-55.619191 188.219003c0 0-2.962183 93.802446 47.346755 183.775729 0 0 52.404139-63.662841 57.714393-181.644403-0.012041 0 3.443838-120.317592-49.441957-190.350329zM903.814864 291.63048s-81.351646 22.493321-143.412983 133.719661c0 0-57.991345 99.02841-49.971778 182.029727 0 0 80.833866-27.165381 142.172719-126.434619-0.012041 0.012041 50.501599-83.422766 51.212042-189.314769zM1016.209219 531.001317s-103.122484-12.101599-193.107808 46.263029c0 0-87.444591 51.344497-132.623895 132.202446 0 0 80.617121 16.978363 192.445532-42.000376 0-0.012041 99.064534-55.655315 133.286171-136.465099zM995.835183 798.380433s-52.849671-53.271119-185.040075-58.37667c0 0-97.414864-1.697836-187.50856 48.827846 0 0 43.842709 53.247037 190.687488 57.931138 0-0.012041 112.081279 4.84064 181.861147-48.382314zM844.944497 1022.253998s-19.097648-81.158984-128.180621-143.039699c0 0-92.309313-59.616933-193.517216-56.233302 0 0 19.531138 73.211665 129.854375 143.039699 0 0 95.512324 56.233302 191.843462 56.233302zM338.676199 138.572342s-49.81524 54.354845-49.815239 191.205269c0 0 1.794167 92.574224 57.292944 185.08824 0 0 46.79285-65.360677 49.273377-185.979303 0 0 3.624459-128.264911-56.751082-190.314206zM120.064722 291.413735s-4.575729 89.178551 49.730951 188.231044c0 0 64.770649 105.892004 143.364816 127.951834 0 0 7.646284-79.148071-50.718344-184.185136 0 0-56.353716-102.580621-142.377423-131.997742zM7.802822 531.206021S27.538664 603.15334 140.222013 668.297272c0 0 114.393227 60.086548 193.746002 40.940734 0 0 1.505174-36.617874-132.202446-131.768956-0.012041 0-104.519285-62.603198-193.962747-46.263029zM28.598307 796.044403s49.020508 48.382314 185.895014 50.706303c0 0 126.819944-1.180056 185.678269-57.714394 0 0-82.326999-50.935089-186.930574-49.032549-0.012041 0-115.657573-3.20301-184.642709 56.04064zM182.234431 1014.812418s68.539605 14.437629 182.499341-45.841581c0 0 104.615616-67.901411 131.985701-142.594167 0 0-69.177799-17.195108-189.724177 53.548071 0 0.012041-94.235936 49.261336-124.760865 134.887677z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)
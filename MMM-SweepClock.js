Module.register("MMM-SweepClock", {

        config: null,
    
        defaults: {
            suspended: false,
            showDate: false,
            dateFormat: "dddd, LL",
            timezone: null
        },
    
        getScripts: function () {
            return ["moment.js", "moment-timezone.js"]
        },
    
        start: function () {
            Log.log(this.name + " (ID: " + this.identifier + ") is starting!");
    
        },
    
        getDom: function () {
            var wrapper = document.createElement("div");
            wrapper.id = "sweep-clock-" + this.identifier;
            wrapper.classList.add("sweep-clock");
            //wrapper.className = "sweep-clock";
            wrapper.innerHTML = `
                <div class="sweep-clock single">
                    <article class="sweepclock station show linear bounce">
                        <div class="hours-container" id="hours-container-${this.identifier}">
                            <div class="sweephours"></div>
                        </div>
                        <div class="minutes-container" id="minutes-container-${this.identifier}">
                            <div class="sweepminutes"></div>
                        </div>
                        <div class="seconds-container" id="seconds-container-${this.identifier}">
                            <div class="sweepseconds"></div>
                        </div>
                    </article>
                </div>
            `;
    
            if (this.config.showDate) {
                const dateWrapper = document.createElement("div");
                dateWrapper.className = "sweepdate normal small";
                wrapper.appendChild(dateWrapper);
    
                const updateDate = () => {
                    const now = this.config.timezone ? moment().tz(this.config.timezone) : moment();
                    dateWrapper.innerHTML = now.format(this.config.dateFormat);
                };
    
                // Initial call to display the date immediately
                updateDate();
    
                // Set interval to update the date every second
                setInterval(updateDate, 1000);
            }
    
            return wrapper;
        },
    
        notificationReceived: function (noti) {
            if (noti === "DOM_OBJECTS_CREATED") {
                this.startClock()
            }
        },
        startClock: function () {
            this.firstMinute();
        },
    
        loaded: function (callback) {
            Log.log(this.name + " is loaded!");
            callback();
        },
    
        getStyles: function () {
            return [
                'MMM-SweepClock.css',
            ]
        },
    
        firstMinute: function () {
            if (this.config.timezone) {
                const now = moment().tz(this.config.timezone);
                const timeAroundClock = 58500;
                const elapsed = now.seconds() * 1000 + now.milliseconds();
    
                this.sweephour(now.hours(), now.minutes());
                this.setMinute(now.minutes());
                if (elapsed >= timeAroundClock) {
                    this.finishedMinuteAnimation();
                } else {
                    this.sweepsecond(elapsed / timeAroundClock, (timeAroundClock - elapsed) / timeAroundClock)
                }
            } else {
                const dateNow = new Date();
                const timeAroundClock = 58500
                    const elapsed = dateNow.getSeconds() * 1000 + dateNow.getMilliseconds()
    
                    this.sweephour(dateNow.getHours(), dateNow.getMinutes())
                    this.setMinute(dateNow.getMinutes())
                    if (elapsed >= timeAroundClock) {
                        this.finishedMinuteAnimation()
                    } else {
                        this.sweepsecond(elapsed / timeAroundClock, (timeAroundClock - elapsed) / timeAroundClock)
                    }
            }
    
        },
    
        finishedMinuteAnimation: async function () {
            let initialHour,
            initialMinute;
    
            if (this.config.timezone) {
                const now = moment().tz(this.config.timezone);
                initialHour = now.hours();
                initialMinute = now.minutes();
            } else {
                const now = new Date();
                initialHour = now.getHours();
                initialMinute = now.getMinutes();
            }
    
            let newMinute = await this.nextMinute();
    
            if (newMinute === 0) {
                newMinute = 60;
            }
    
            this.sweepsecond();
            this.sweepminute(initialMinute, newMinute);
            this.sweephour(initialHour, newMinute);
        },
    
        nextMinute: function () {
            return new Promise(resolve => {
                if (this.config.timezone) {
                    const now = moment().tz(this.config.timezone);
                    const remainingMilliseconds = ((60 - now.seconds()) * 1000) + (1000 - now.milliseconds());
    
                    setTimeout(() => {
                        const nextMinuteTime = moment().tz(this.config.timezone).minutes();
                        resolve(nextMinuteTime);
                    }, remainingMilliseconds);
                } else {
                    const now = new Date();
                    const remainingMilliseconds = ((60 - now.getSeconds()) * 1000) + (1000 - now.getMilliseconds());
    
                    setTimeout(() => {
                        resolve(new Date().getMinutes());
                    }, remainingMilliseconds);
                }
            });
        },
    
        sweephour: function (hour, minute) {
            const degreePerHour = 360 / 12
                const degreePerHourInMinutes = degreePerHour / 60
                const hourInDegree = (hour % 12) * degreePerHour
                const hourElement = document.querySelector(`#hours-container-${this.identifier}`); //('.hours-container');
            hourElement.style.transform = 'rotate(' + (hourInDegree + (minute * degreePerHourInMinutes)) + 'deg)'
                hourElement.style.opacity = 1
        },
    
        setMinute: function (value) {
            const degreePerMinute = 360 / 60
                const minuteElement = document.querySelector(`#minutes-container-${this.identifier}`); //('.minutes-container');
            minuteElement.style.transform = 'rotate(' + (value * degreePerMinute) + 'deg)'
                minuteElement.style.opacity = 1
        },
    
        sweepminute: function (initialMinute, newMinute) {
            const degreePerMinute = 360 / 60
                const minuteElement = document.querySelector(`#minutes-container-${this.identifier}`); //('.minutes-container');
            if (newMinute === 60) {
                let animation = minuteElement.animate([{
                                transform: 'rotate(' + initialMinute * degreePerMinute + 'deg)'
                            }, {
                                transform: 'rotate(' + newMinute * degreePerMinute + 'deg)'
                            }
                        ], {
                        duration: 300,
                        iterations: 1,
                        easing: 'cubic-bezier(1, 2.52, 0.71, 0.6)',
                        fill: 'forwards'
                    })
                    animation.finished.then(() => {
                        minuteElement.style.transform = 'rotate(0deg)'
                    })
                    animation.play()
            } else {
                let animation = minuteElement.animate([{
                                transform: 'rotate(' + initialMinute * degreePerMinute + 'deg)'
                            }, {
                                transform: 'rotate(' + newMinute * degreePerMinute + 'deg)'
                            }
                        ], {
                        duration: 300,
                        iterations: 1,
                        easing: 'cubic-bezier(1, 2.52, 0.71, 0.6)',
                        fill: 'both'
                    }).play()
            }
        },
    
        sweepsecond: function (start = 0, iterations = 1) {
            const timeAroundClock = 58500
                const secondsElement = document.querySelector(`#seconds-container-${this.identifier}`); //('.seconds-container');
            let animation = secondsElement.animate([{
                            transform: 'rotate(0)',
                            easing: 'cubic-bezier(0.2, 0, 1, 1)'
                        }, {
                            transform: 'rotate(0.25turn)',
                            easing: 'cubic-bezier(0.11, 0.12, 0.85, 0.86)',
                            offset: 0.25
                        }, {
                            transform: 'rotate(0.95turn)',
                            easing: 'cubic-bezier(1, 1.36, 0.88, 0.88)',
                            offset: 0.95
                        }, {
                            transform: 'rotate(1turn)'
                        }
                    ], {
                    duration: timeAroundClock,
                    fill: 'none',
                    iterationStart: start,
                    iterations: iterations
                })
                animation.finished.then(() => {
                    this.finishedMinuteAnimation()
                })
                animation.play()
                secondsElement.style.opacity = 1
        },
    })
    
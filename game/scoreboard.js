export class Scoreboard {

    constructor(match) {

        this.match = match;

        this.createUI();

    }

    createUI() {

        this.container = document.createElement("div");

        this.container.style.position = "absolute";
        this.container.style.top = "20px";
        this.container.style.left = "50%";
        this.container.style.transform = "translateX(-50%)";

        this.container.style.background =
            "rgba(0,0,0,0.75)";

        this.container.style.color = "white";

        this.container.style.padding =
            "10px 24px";

        this.container.style.borderRadius =
            "14px";

        this.container.style.fontFamily =
            "Arial, sans-serif";

        this.container.style.fontWeight =
            "bold";

        this.container.style.fontSize =
            "24px";

        this.container.style.userSelect =
            "none";

        this.container.style.boxShadow =
            "0 0 15px rgba(0,0,0,.45)";

        this.container.style.zIndex = "999";

        document.body.appendChild(
            this.container
        );

        this.update();

    }

    update() {

        this.container.innerHTML =

            `<span style="color:#4ea3ff">Blue FC</span>
             ${this.match.homeScore}
             :
             ${this.match.awayScore}
             <span style="color:#ff5757">Red FC</span>

             &nbsp;&nbsp;&nbsp;

             ⏱ ${this.match.getTimeString()}`;

        if (this.match.state === "goal") {

            this.container.innerHTML +=

                `<br><div style="
                    text-align:center;
                    color:gold;
                    font-size:18px;
                    margin-top:8px;">
                    GOAL!
                 </div>`;

        }

        if (this.match.state === "halftime") {

            this.container.innerHTML +=

                `<br><div style="
                    text-align:center;
                    color:orange;
                    font-size:18px;
                    margin-top:8px;">
                    HALF TIME
                 </div>`;

        }

        if (this.match.state === "fulltime") {

            this.container.innerHTML +=

                `<br><div style="
                    text-align:center;
                    color:#00ff90;
                    font-size:18px;
                    margin-top:8px;">
                    FULL TIME
                 </div>`;

        }

    }

}

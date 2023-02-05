class MyCar {
    constructor(name, horsepower, color) {
        this.name = name;
        this.horsepower = horsepower;
        this.color = color;
    }
    start = () => {
        console.log(`${this.name} 출발!!`);
    };
    stop = () => {
        console.log(`${this.name} 정지!!`);
    };
}

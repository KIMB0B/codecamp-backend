export class MenuController {
    constructor(menuModel) {
        this.menuModel = menuModel;
    }

    getMenus = async (req, res) => {
        try {
            res.send(await this.menuModel.find());
        } catch {
            res.status(422).send("NotConnectedDB");
        }
    };
}

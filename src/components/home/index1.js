class Model {
    constructor() {
        console.log('const')
        this.abc = 'hh'
    }
}

class FindLive2D {
    static createScene() {

    }
    static Model = Model
}

export default FindLive2D
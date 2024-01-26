interface Chessboard_Params {
    lines?: [
        number,
        number
    ];
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    legalPointXArray?: number[];
    legalPointYArray?: number[];
    lineGap?: number;
    nodeRadius?: number;
    localIsWhite?: boolean;
    whiteNext?: boolean;
    initialized?: boolean;
    whiteNodes?: [
        number,
        number
    ][];
    blackNodes?: [
        number,
        number
    ][];
    gameOver?;
    distributeModel?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "chessboard_" + ++__generate__Id;
}
import { DistributeModel } from '../models/distributeModel';
export class Chessboard extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.lines = [10, 10];
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.legalPointXArray = [];
        this.legalPointYArray = [];
        this.lineGap = undefined;
        this.nodeRadius = undefined;
        this.__localIsWhite = new SynchedPropertySimpleTwoWay(params.localIsWhite, this, "localIsWhite");
        this.__whiteNext = new SynchedPropertySimpleTwoWay(params.whiteNext, this, "whiteNext");
        this.__initialized = new SynchedPropertySimpleTwoWay(params.initialized, this, "initialized");
        this.whiteNodes = [];
        this.blackNodes = [];
        this.gameOver = false;
        this.distributeModel = DistributeModel.getInstance(getContext(this));
        this.updateWithValueParams(params);
        this.declareWatch("initialized", this.initializedChanged);
    }
    updateWithValueParams(params: Chessboard_Params) {
        if (params.lines !== undefined) {
            this.lines = params.lines;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.legalPointXArray !== undefined) {
            this.legalPointXArray = params.legalPointXArray;
        }
        if (params.legalPointYArray !== undefined) {
            this.legalPointYArray = params.legalPointYArray;
        }
        if (params.lineGap !== undefined) {
            this.lineGap = params.lineGap;
        }
        if (params.nodeRadius !== undefined) {
            this.nodeRadius = params.nodeRadius;
        }
        if (params.whiteNodes !== undefined) {
            this.whiteNodes = params.whiteNodes;
        }
        if (params.blackNodes !== undefined) {
            this.blackNodes = params.blackNodes;
        }
        if (params.gameOver !== undefined) {
            this.gameOver = params.gameOver;
        }
        if (params.distributeModel !== undefined) {
            this.distributeModel = params.distributeModel;
        }
    }
    aboutToBeDeleted() {
        this.__localIsWhite.aboutToBeDeleted();
        this.__whiteNext.aboutToBeDeleted();
        this.__initialized.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private lines: [
        number,
        number
    ];
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private legalPointXArray: number[];
    private legalPointYArray: number[];
    private lineGap: number;
    private nodeRadius: number;
    private __localIsWhite: SynchedPropertySimpleTwoWay<boolean>;
    get localIsWhite() {
        return this.__localIsWhite.get();
    }
    set localIsWhite(newValue: boolean) {
        this.__localIsWhite.set(newValue);
    }
    private __whiteNext: SynchedPropertySimpleTwoWay<boolean>;
    get whiteNext() {
        return this.__whiteNext.get();
    }
    set whiteNext(newValue: boolean) {
        this.__whiteNext.set(newValue);
    }
    private __initialized: SynchedPropertySimpleTwoWay<boolean>;
    get initialized() {
        return this.__initialized.get();
    }
    set initialized(newValue: boolean) {
        this.__initialized.set(newValue);
    }
    private whiteNodes: [
        number,
        number
    ][];
    private blackNodes: [
        number,
        number
    ][];
    private gameOver;
    private distributeModel;
    initializedChanged(propName: string) {
        this.distributeModel.getData("data", data => {
            this.onDataReceived(data);
            console.log("xxx--- subscribe");
            this.distributeModel.subscribe((notification) => {
                console.log("xxx--- chessboard " + JSON.stringify(notification));
                let changedData = this.distributeModel.getChangedData(notification)[0];
                if (changedData.key == "data") {
                    console.log("xxx--- update data");
                    let entryJson = changedData.value.value as string;
                    this.onDataReceived(entryJson);
                }
            }, () => { });
        }, () => {
        });
    }
    onDataReceived(json: string) {
        console.log("xxx--- onDataReceived " + json);
        if (json == null) {
            return;
        }
        let entry = JSON.parse(json) as Array<string | boolean>;
        this.whiteNext = entry[0] as boolean;
        this.whiteNodes = JSON.parse(entry[1] as string);
        this.blackNodes = JSON.parse(entry[2] as string);
        this.drawNodes(this.whiteNodes);
        this.drawNodes(this.blackNodes);
    }
    getSeparatePoint(index: number, lineGap: number) {
        return (index + 1) * lineGap;
    }
    updateNode(nodes: [
        number,
        number
    ][], x, y) {
        let exist = nodes.findIndex((value, index, array) => {
            return value[0] == x && value[1] == y;
        });
        if (exist == -1) {
            nodes.push([x, y]);
        }
    }
    drawGrid() {
        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.strokeStyle = "black";
        this.lineGap = (this.context.height / (this.lines[0] + 1));
        this.nodeRadius = this.lineGap / 2 - 4;
        // 绘制横线
        for (var i = 0; i < this.lines[0]; i++) {
            var y = this.getSeparatePoint(i, this.lineGap);
            this.legalPointYArray.push(y);
            this.context.moveTo(0, y);
            this.context.lineTo(this.context.width, y);
        }
        // 绘制竖线
        for (var i = 0; i < this.lines[1]; i++) {
            var x = this.getSeparatePoint(i, this.lineGap);
            this.legalPointXArray.push(x);
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.context.width);
        }
        this.context.stroke();
    }
    drawNodes(nodes: [
        number,
        number
    ][]) {
        if (nodes === this.whiteNodes) {
            this.context.fillStyle = "white";
        }
        else {
            this.context.fillStyle = "black";
        }
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var nodeX = this.legalPointXArray[node[0]];
            var nodeY = this.legalPointYArray[node[1]];
            this.context.beginPath();
            this.context.arc(nodeX, nodeY, this.nodeRadius, 0, 2 * Math.PI);
            this.context.fill();
        }
    }
    judgeWin(): [
        number,
        number
    ][] | null {
        if (this.judgeWinAlgorithm(this.whiteNodes)) {
            return this.whiteNodes;
        }
        else if (this.judgeWinAlgorithm(this.blackNodes)) {
            return this.blackNodes;
        }
        else {
            return null;
        }
    }
    judgeWinAlgorithm(nodes: [
        number,
        number
    ][]): boolean {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var rowCount = 0;
            var columnCount = 0;
            var slashCount = 0;
            var backSlashCount = 0;
            var nodeX = node[0];
            var nodeY = node[1];
            do {
                nodeX++;
                rowCount++;
            } while (nodes.findIndex((value, index, arr) => { return value[0] == nodeX && value[1] == nodeY; }) != -1);
            nodeX = node[0];
            nodeY = node[1];
            do {
                nodeX--;
                rowCount++;
            } while (nodes.findIndex((value, index, arr) => { return value[0] == nodeX && value[1] == nodeY; }) != -1);
            rowCount--;
            nodeX = node[0];
            nodeY = node[1];
            do {
                nodeY++;
                columnCount++;
            } while (nodes.findIndex((value, index, arr) => { return value[0] == nodeX && value[1] == nodeY; }) != -1);
            nodeX = node[0];
            nodeY = node[1];
            do {
                nodeY--;
                columnCount++;
            } while (nodes.findIndex((value, index, arr) => { return value[0] == nodeX && value[1] == nodeY; }) != -1);
            columnCount--;
            nodeX = node[0];
            nodeY = node[1];
            do {
                nodeX++;
                nodeY++;
                backSlashCount++;
            } while (nodes.findIndex((value, index, arr) => { return value[0] == nodeX && value[1] == nodeY; }) != -1);
            nodeX = node[0];
            nodeY = node[1];
            do {
                nodeX--;
                nodeY--;
                backSlashCount++;
            } while (nodes.findIndex((value, index, arr) => { return value[0] == nodeX && value[1] == nodeY; }) != -1);
            backSlashCount--;
            nodeX = node[0];
            nodeY = node[1];
            do {
                nodeX++;
                nodeY--;
                slashCount++;
            } while (nodes.findIndex((value, index, arr) => { return value[0] == nodeX && value[1] == nodeY; }) != -1);
            nodeX = node[0];
            nodeY = node[1];
            do {
                nodeX--;
                nodeY++;
                slashCount++;
            } while (nodes.findIndex((value, index, arr) => { return value[0] == nodeX && value[1] == nodeY; }) != -1);
            slashCount--;
            //      if (i == 0) {
            //        console.log("row count " + rowCount)
            //        console.log("column count " + columnCount)
            //        console.log("slash count " + slashCount)
            //        console.log("back slash count " + backSlashCount)
            //        console.log("\n ")
            //      }
            if (rowCount >= 5 ||
                columnCount >= 5 ||
                slashCount >= 5 ||
                backSlashCount >= 5) {
                if (nodes === this.whiteNodes) {
                    console.log("white win");
                }
                else {
                    console.log("black win");
                }
                return true;
            }
            else {
                return false;
            }
        }
    }
    drawChessboard() {
        console.log("xxx--- drawChessboard");
        this.context.clearRect(0, 0, this.context.width, this.context.height);
        this.drawGrid();
        // 绘制棋子
        this.drawNodes(this.whiteNodes);
        this.drawNodes(this.blackNodes);
    }
    render() {
        Canvas.create(this.context);
        Canvas.backgroundColor("#fffcb11c");
        Canvas.width("100%");
        Canvas.aspectRatio(1);
        Canvas.onReady(() => {
            this.drawChessboard();
        });
        Canvas.onTouch((event) => {
            if (event.type != TouchType.Down) {
                return;
            }
            if (this.whiteNext && !this.localIsWhite) {
                return;
            }
            else if (!this.whiteNext && this.localIsWhite) {
                return;
            }
            var touch = event.touches[0];
            var x, y: number;
            // 判断棋子x
            for (var i = 0; i < this.legalPointXArray.length; i++) {
                var legalX = this.legalPointXArray[i];
                if (Math.abs(touch.x - legalX) < this.nodeRadius) {
                    x = i;
                    break;
                }
            }
            // 判断棋子y
            for (var j = 0; j < this.legalPointYArray.length; j++) {
                var legalY = this.legalPointXArray[j];
                if (Math.abs(touch.y - legalY) < this.nodeRadius) {
                    y = j;
                    break;
                }
            }
            // 有效点击落子
            if (x != undefined && y != undefined) {
                if (this.gameOver) {
                    return;
                }
                let existInWhite = this.whiteNodes.findIndex((value, index, arr) => {
                    return value[0] == x && value[1] == y;
                }) != -1;
                let existInBlack = this.blackNodes.findIndex((value, index, arr) => {
                    return value[0] == x && value[1] == y;
                }) != -1;
                if (existInWhite || existInBlack) {
                    return;
                }
                if (this.whiteNext) {
                    // 更新model
                    this.updateNode(this.whiteNodes, x, y);
                }
                else {
                    // 更新model
                    this.updateNode(this.blackNodes, x, y);
                }
                let judgeWin = this.judgeWin();
                if (judgeWin != null) {
                    this.gameOver = true;
                    let message = judgeWin == this.whiteNodes ? "白棋胜" : "黑棋胜";
                    AlertDialog.show({
                        confirm: {
                            value: "好",
                            action: () => {
                                this.whiteNodes = [];
                                this.blackNodes = [];
                                this.gameOver = false;
                                this.context.clearRect(0, 0, this.context.width, this.context.height);
                                this.drawGrid();
                            }
                        },
                        message: message
                    });
                    return;
                }
                this.whiteNext = !this.whiteNext;
                let array = [this.whiteNext, JSON.stringify(this.whiteNodes), JSON.stringify(this.blackNodes)];
                this.distributeModel.writeData("data", JSON.stringify(array));
            }
            this.drawNodes(this.whiteNodes);
            this.drawNodes(this.blackNodes);
        });
        Canvas.pop();
    }
}

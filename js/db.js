class DB_Bridge{
    // db = []
    // setting = {}

    async rm_db() {
        await idb.deleteDB("book-history-db")
        await this.init()
    }
    async init () {
        // indexedDB 確認
            // try {
        //         this.idb = await idb.openDB("book-history-db", 1, {
        //             upgrade(db) {
        //                 db.createObjectStore("book-data", { keyPath: "index" })
        //                 db.createObjectStore("setting-data", { keyPath: "index" })
        //             }
        //         })
        //         this.idb
        //             .transaction("book-data", "readwrite")
        //             .objectStore("book-data")
        //             .add({
        //             /* 本の内容を登録するjson(形のみ) */
        //             "title": "はじめに",
        //             "title_kana": "ハジメニ",
        //             "author": "Hiijii428",
        //             "author_kana": null,
        //             "author_desc": null,
                
        //             "descript": `
        // # 本棚アプリ

        // ## 概要

        // ISBNから、本の情報を取得し、登録。本の一覧（本棚）を作ることができるアプリです。  
        // 図書館の貸出メモや、読書記録、頭の整理などに使用できます。

        // <img style="width:100%" width="620" height="349" alt="README-VIDEO" src="https://raw.githubusercontent.com/hiijii428/book-history/refs/heads/main/README-VIDEO.gif" />

        // # 使い方

        // 1. 閲覧
        // 本のカードをクリックすると、詳細が表示されます。  
        // 詳細には、タイトル・著者紹介・定価・ISBNなどの書誌情報から、  
        // コメント・タグ・購入日など、ユーザーが自分でつけることのできるものがあります。

        // 2. 編集
        // 書誌情報・コメント等の編集は左上のペンアイコンをクリックすることでできます。  
        // ペンアイコンをクリックし、ポップアップから編集したい項目を選び、編集後OKを押下することで編集保存できます。

        // 3. タグ付け
        // 編集時に”タグ”を選ぶことでタグ付けができます。これは、本のジャンル分け・絞り込みに最適です。  
        // 付け方の例：購入,小説,感動 / 図書館,ビジネス書,参考書 など  
        // 一覧画面上部の横に並んでいるタグをクリックすると絞り込みができます。  
        // また、タグリスト上部の"かつ","又は"で絞り込みの方法を変えることができます。

        // 4. ソート
        // 内容項目で本リストをソートすることができます。  
        // 一覧画面上部のプルダウンを選択することで、並べ替えることができます。  
        // タイトル（カナ読み）で並べ替えれば、タイトルの五十音順に並べ替えることができます。

        // 5. 登録
        // 一覧画面上部の、本アイコン・カメラアイコンで本をISBNから検索登録することができます。  
        // ISBNとは、本につけられている番号であり、外部APIで検索をかけることにより、書誌情報を取得しています。  
        // ISBNは、本の裏表紙上部にあるバーコード(97から始まる13桁の番号)です。
        // - 本アイコン  
        // ISBNを入力することで検索します。  
        // また、ISBNが入ったCSVから複数検索をかけることができます。  
        // CSVの場合、ISBNのみを抽出するため、インポートではありません。  
        // また、書誌情報の手動入力でも登録できます。(検索はしない)
        // - カメラアイコン
        // PCに搭載されたカメラから、本のバーコードを読み取り、検索します。  
        // バーコードが読み取り次第、検索登録します。

        // 6. CSVエクスポート
        // 一覧画面上部の下向き矢印アイコンをクリックすることで、  
        // 登録されているすべての本の情報をCSVとしてダウンロードすることができます。

        // 7. 設定
        // 歯車アイコンをクリックすると設定画面が表示されます。  
        // 現在(0.1.1)では画像表示は無効になっています。

        // 8. 保存場所変更
        // メニューバーの編集から環境設定を選ぶと、初期設定画面が出てきます。  
        // そこで、移動先のフォルダを選択すると、保存場所を変更することができます。

        // ぜひ、このアプリを使ってください！

        // <hr>
        // <p style="text-algin:center;">Hiijii428が作成。2026/09-</p>

        // # 情報取得元

        // - openBD API(open book data api)
        // - NDL API(国立国会図書館)
        // - 紀伊國屋書店HP (画像のみ) => 現在(0.1.1)では無効
        // `,
        //             "cover": null,
        //             "publisher": "Hiijii428",
        //             "pubdate": "2026.09",
                
        //             "price": "000",
        //             "lang":"JP",
        //             "page": "000",
        //             "isbn": "9000000000000",
        //             "ndc":"000",
                
        //             "get_day": "",
        //             "comment": "<mark>　　左上のペンアイコンからここを編集できます。</mark>",
        //             "tags": "カンマ区切りで複数のワードを入力できます。",
                
        //             "index":0
        //                 })
        //         this.idb
        //             .transaction("setting-data", "readwrite")
        //             .objectStore("setting-data")
        //             .add({index:0, "setting": "true" });

        //         console.log("Init OK!");
        //     } catch (e) {
        //         console.error(e)
        //         console.error("DB Error! init:"+e)
        //     }
    }
    open() {
        return new Promise(async (resolve, reject) => {
            try {
                // let data = await this.idb
                //     .transaction("book-data", "readwrite")
                //     .objectStore("book-data")
                //     .getAll()
                // console.log(data)
                resolve([]);
            } catch (e){
                reject("DB Error! open:"+e);
            }
        })
    }
    add(json) {
        return new Promise(async (resolve, reject) => {
            try {
                // json = JSON.parse(json)
                // let db = await this.idb
                //     .transaction("book-data", "readwrite")
                //     .objectStore("book-data")
                //     .getAll()
                // console.log(db)
                // json["index"] = db.at(-1)["index"] + 1  //一番最新よりも一つ大きな数。
                // await this.idb
                //     .transaction("book-data", "readwrite")
                //     .objectStore("book-data")
                //     .add(json)
                resolve();
            } catch (e) {
                console.error(e)
                reject("DB Error! add:"+e);
            }
        })
    }
    edit(index,book_data) {
        return new Promise(async (resolve, reject) => {
            try {
                // // let list_index = null;
                // // for (let i = 0; i < this.db.length; i++) {
                // //     if (this.db[i]["index"] === index) {
                // //         list_index = i
                // //         break;
                // //     }
                // // }
                // let db = await this.idb
                //     .transaction("book-data", "readwrite")
                //     .objectStore("book-data")
                //     .put(book_data)
                // console.log(book_data["title"] + "を編集保存");
                resolve();
            } catch (e) {
                console.error(e)
                reject("DB Error! edit:"+e);
            }
        })
    }
    remove(index) {
        return new Promise(async (resolve, reject) => {
            try {
                // let data = await this.idb
                //     .transaction("book-data", "readwrite")
                //     .objectStore("book-data")
                //     .delete(index);
                resolve("OK");
            } catch (e){
                reject("DB Error! remove:"+e);
            }
        })
    }

    setting_open() {
        return new Promise(async (resolve, reject) => {
            try {
                // let data = await this.idb
                //     .transaction("setting-data", "readwrite")
                //     .objectStore("setting-data")
                //     .get(0);
                resolve({})
            } catch (e){
                reject("DB Error! setting_open:"+e);
            }
        })
    }
    setting_edit(key, data) {
        return new Promise(async (resolve, reject) => {
            try {
                // let db = await this.idb
                //     .transaction("setting-data", "readwrite")
                //     .objectStore("setting-data")
                //     .get(0)
                // db[key] = data;
                // console.log(db)
                // try {
                //     let t = this.idb.transaction("setting-data", "readwrite")
                //     let tx = t.objectStore("setting-data")
                //     tx.put(db);
                // } catch (e){
                //     console.error(e)
                // }
                resolve("OK")
            } catch (e) {
                console.error(e);
                reject("DB Error! setting_edit:"+e);
            }
        })
    }
    file_open() {
    }
    file_download(file_data) {
    }
    binary_save(url, path) {
    }
}

/**
 * www.kinokuniya.co.jp/f/dsg-01-ISBN
 * https://api.openbd.jp/v1/get?isbn=ISBN&pretty
 * https://ndlsearch.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn=ISBN
 * https://ndlsearch.ndl.go.jp/api/opensearch?isbn=ISBN
 */


class isbn_search{
    openbd(isbn, json = null) {
        return new Promise(async (resolve, reject) => {
            try {
                if (json === null) {
                    json = structuredClone(example_json);
                }
                /* OpenBD(book data)を叩く */
                console.log('https://api.openbd.jp/v1/get?isbn=' + isbn + '&pretty')
                let data = await fetch('https://api.openbd.jp/v1/get?isbn=' + isbn + '&pretty');
                if (data.status !== 200) {
                    error_toast("リクエストエラー" + data.statusText)
                    console.log(data.statusText)
                    reject(text.statusText);
                } else {
                    data = await data.json()
                    console.log(data)
                    json["isbn"] = isbn;              //isbn
                    if (data[0] != null) {
                        json["title"] = data[0]["summary"]["title"]            //title
                        json["title_kana"] = data[0]?.["onix"]?.["DescriptiveDetail"]?.["TitleDetail"]?.["TitleElement"]?.["TitleText"]?.["collationkey"]//titleカナ
                        json["publisher"] = data[0]["summary"]["pubrisher"] + "  " + data[0]["summary"]["series"]   //発行元
                        json["pubdate"] = data[0]["summary"]["pubdata"]        //発行日
                        json["author"] = data[0]["summary"]["author"].replace(",", " ")          //著者

                        json["author_desc"] = data[0]?.["onix"]?.["DescriptiveDetail"]?.["Contributor"]?.[0]?.["BiographicalNote"];//著者 詳細
                        json["author_kana"] = data[0]?.["onix"]?.["DescriptiveDetail"]?.["Contributor"]?.[0]?.["PersonName"]?.["collationkey"]?.replace(",", " "); //著者（カナ）

                        json["price"] = data[0]?.["onix"]?.["ProductSupply"]?.["SupplyDetail"]?.["Price"]?.[0]?.["PriceAmount"]; //金額
                        json["lang"] = data[0]?.["onix"]?.["DescriptiveDetail"]?.["Language"]?.[0]?.["CountryCode"];//言語
                        json["page"] = data[0]?.["onix"]?.["DescriptiveDetail"]?.["Extent"]?.[0]?.["ExtentValue"] //ページ数
                        let desc_data = data[0]?.["onix"]?.["CollateralDetail"]?.["TextContent"]; //本の詳細
                        if (desc_data) {
                            for (l of desc_data) {
                                json["descript"] += l["Text"] + "<br>　"
                            }
                        }
                        json["cover_url"] = data[0]["summary"]["cover"];
                        resolve(json);
                    } else {
                        reject("Book Not Found");
                    }
                }
            } catch (e) {
                console.error(e)
                reject("ERROR! OpenBD API: "+e)
            }
        });
    }
    ndl(isbn, json = null) {
        /**NDLから取得、promise関数、リクエスト失敗・データなしにはreject */
        return new Promise(async (resolve, reject) => {
            try {
                if (json === null) {
                    json = structuredClone(example_json);
                }
                let text = await fetch("https://ndlsearch.ndl.go.jp/api/opensearch?isbn=" + isbn)
                if (text.status !== 200) {
                    error_toast("リクエストエラー" + text.statusText)
                    console.log(text.statusText)
                    reject(json);
                } else {
                    text = await text.text()
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(text, "text/xml");
                    let doc = xml.getElementsByTagName("item")[0]
                    // console.log(doc)
                    if (doc) {
                        json["title"] = doc.getElementsByTagName("title")[0].innerHTML ?? json["title"];
                        console.log(json["title"])
                        json["title_kana"] = doc.getElementsByTagName("dcndl:titleTranscription")[0]?.innerHTML ?? json["title_kana"];
                        json["author"] = doc.getElementsByTagName("author")[0]?.innerHTML?.split(",").at(-1) ?? json["author"];
                        json["publisher"] = doc.getElementsByTagName("dc:publisher")[0]?.innerHTML ?? json["publisher"];
                        json["lang"] = doc.getElementsByTagName("dcndl:publicationPlace")[0]?.innerHTML ?? json["lang"];
                        json["pubdate"] = doc.getElementsByTagName("dcterms:issued")[0]?.innerHTML ?? json["pubdate"];
                        json["page"] = doc.getElementsByTagName("dc:extent")[0]?.innerHTML.replace("p", "") ?? json["page"];
                        json["price"] = doc.getElementsByTagName("dcndl:price")[0]?.innerHTML.replace("円", "") ?? json["price"];
                        json["ndc"] = String(doc.innerHTML).match(/<dc:subject.*xsi:type="dcndl:NDC[0-9]+".*>[^<]*<\/dc:subject>/g)?.[0]?.match(">.*<")?.[0]?.match("[0-9]{3}")?.[0] ?? json["ndc"];

                        json["descript"] += "（" + doc.getElementsByTagName(`link`)[0]?.innerHTML + "（国立国会図書館リンク)）\n";
                        resolve(json);
                    } else {
                        reject("Book Not Found")
                    }
                }
            } catch (e) {
                console.error(e);
                reject("Error! NDL API"+e)
            }
        });
    }

}
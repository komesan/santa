// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove,onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCl4EMqsSHwKX5PYlUmj_2UVp4yNLcXXcc",
    authDomain: "dev245-58925.firebaseapp.com",
    projectId: "dev245-58925",
    storageBucket: "dev245-58925.appspot.com",
    messagingSenderId: "276889990744",
    appId: "1:276889990744:web:d93bcb0677a7e7528fbc2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, 'dev245');

// 送信処理を記述
$('#send').on('click', function () {

    // id="uname" の場所を取得します🤗
    const uname = $('#uname').val();
    // console.log(uname, 'データの取得の仕方で表示が異なるのをチェックしましょう🤗')

    const things = $('#things').val();
    const size = $('#size').val();
    const feeling = $('#feeling').val();

    // id="text" の場所を取得します🤗
    const text = $('#text').val();
    // console.log(text, 'データの取得の仕方で表示が異なるのをチェックしましょう🤗')

    // 取得できているか表示の確認をしましょう！
    // これ必須！ 表示の確認ができて方はalertをコメントアウトしておきましょう🤗
    alert(uname + things + size + feeling + text);


    // データの塊を作ります🤗
    // msg という名前で塊を作ります
    // unameという鍵の名前
    // textというカギの名前
    // 作成したデータの塊をfirebaseに送信をします⇨つまりこれが保存になります🤗
    const msg = {
        uname: uname,
        things: things,
        size: size,
        feeling: feeling,
        text: text,
    }

    // firebaseに送る準備をしていることになります🤗
    const newPostRef = push(dbRef) //データを送信できる準備
    set(newPostRef, msg); // firebaseの登録できる場所に保存するイメージです🤗

    // 送信後に入力欄を空欄にする
    $('#uname').val("");
    $('#things').val("");
    $('#size').val("");
    $('#feeling').val("");
    $('#text').val("");

    // 場所を特定してカーソルを当てる
    $('#uname').focus();

    // send送信イベント この下を消さない

});

        {/* 受信処理を記述 */}
        onChildAdded(dbRef, function(data){
        const msg = data.val();
        console.log(msg, '取得したデータの塊')
        const key = data.key;
        console.log(key, 'データの塊にアクセス')

        // es6のテンプレートリテラル
        let h = `
            <div class="msg">
                <p>${msg.uname}</p>
                <p>${msg.things}</p>
                <p>${msg.size}</p>
                <p>${msg.feeling}</p>
                <p>${msg.text}</p>
            </div>           
        `;
            // htmlに埋め込みましょう
            // append();というjqueryのおまじないを使いましょう
            $("#output").append(h);
    });
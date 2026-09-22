// ============================================================
// 算数 判定テスト 問題バンク（小4・全単元横断）
//   - unit ごとに正答率を集計し、苦手マップの元データになる
//   - 図形（垂直平行・四角形の定義・対角線）は今夏の最優先ターゲットのため
//     3つの unit に細分化し、他より解像度高く判定する
//   - 詳細: reports/kids/算数図形_改善プログラム_202608.md
// ============================================================

window.SANSU_PROBLEMS = [
  // --- 図形:垂直平行（最優先） ---
  { id: "s-0001", unit: "図形:垂直平行", question: "2本の直線が交わってできる角が直角のとき、この2本の直線の関係を何という？",
    answer: "垂直", distractors: ["平行", "対角線"], explanation: "直角に交わる2直線は「垂直」" },
  { id: "s-0002", unit: "図形:垂直平行", question: "どこまでのばしても交わらない2本の直線の関係を何という？",
    answer: "平行", distractors: ["垂直", "対角線"], explanation: "どこまでのばしても交わらない2直線は「平行」" },
  { id: "s-0003", unit: "図形:垂直平行", question: "長方形の、となり合った2つの辺の関係は？",
    answer: "垂直", distractors: ["平行", "対角線"], explanation: "長方形のとなり合う辺は直角に交わるので「垂直」" },
  { id: "s-0029", unit: "図形:垂直平行", question: "1本の直線に垂直な2本の直線どうしの関係は？",
    answer: "平行", distractors: ["垂直", "交わる"], explanation: "同じ直線に垂直な2直線どうしは平行になる" },
  { id: "s-0030", unit: "図形:垂直平行", question: "平行な2本の直線のはばは、どこをはかると？",
    answer: "どこも同じ", distractors: ["場所によってちがう", "はしほどせまい"], explanation: "平行な2直線のはばはどこでも等しい" },
  { id: "s-0031", unit: "図形:垂直平行", question: "直線アと直線イが平行で、直線イと直線ウも平行のとき、アとウの関係は？",
    answer: "平行", distractors: ["垂直", "交わる"], explanation: "同じ直線に平行な2直線どうしも平行になる" },

  // --- 図形:四角形の定義（最優先） ---
  { id: "s-0004", unit: "図形:四角形の定義", question: "向かい合った2組の辺がどちらも平行な四角形は？",
    answer: "平行四辺形", distractors: ["台形", "ひし形"], explanation: "2組の辺が両方平行なのは「平行四辺形」" },
  { id: "s-0005", unit: "図形:四角形の定義", question: "4つの辺の長さがすべて等しい四角形は？",
    answer: "ひし形", distractors: ["長方形", "台形"], explanation: "辺の長さが全部等しい四角形は「ひし形」" },
  { id: "s-0006", unit: "図形:四角形の定義", question: "向かい合った1組の辺だけが平行な四角形は？",
    answer: "台形", distractors: ["平行四辺形", "正方形"], explanation: "1組だけ平行なのは「台形」" },

  // --- 図形:対角線（最優先） ---
  { id: "s-0007", unit: "図形:対角線", question: "四角形の、向かい合った頂点どうしを結んだ直線を何という？",
    answer: "対角線", distractors: ["平行線", "垂直線"], explanation: "向かい合う頂点を結ぶ線が「対角線」" },
  { id: "s-0008", unit: "図形:対角線", question: "2本の対角線が垂直に交わる四角形はどれ？",
    answer: "ひし形", distractors: ["台形", "長方形"], explanation: "ひし形の対角線は垂直に交わる" },
  { id: "s-0009", unit: "図形:対角線", question: "2本の対角線の長さが等しい四角形はどれ？",
    answer: "長方形", distractors: ["平行四辺形", "ひし形"], explanation: "長方形の対角線は長さが等しい" },
  { id: "s-0026", unit: "図形:対角線", question: "四角形に対角線は何本ひける？",
    answer: "2本", distractors: ["1本", "4本"], explanation: "四角形の対角線は2本" },
  { id: "s-0027", unit: "図形:対角線", question: "2本の対角線が、長さも等しく、しかも垂直に交わる四角形はどれ？",
    answer: "正方形", distractors: ["ひし形", "長方形"], explanation: "正方形は長方形とひし形の性質を両方もつ" },
  { id: "s-0028", unit: "図形:対角線", question: "平行四辺形の2本の対角線は、交わった点でどうなっている？",
    answer: "それぞれ2等分されている", distractors: ["直角に交わっている", "長さが等しい"], explanation: "平行四辺形の対角線はたがいを2等分する" },

  // --- 大きな数 ---
  { id: "s-0010", unit: "大きな数", question: "一億を10こ集めた数は？",
    answer: "十億", distractors: ["一千万", "百億"], explanation: "一億×10=十億" },
  { id: "s-0011", unit: "大きな数", question: "1のあとに0が8こ続く数（100000000）を読むと？",
    answer: "一億", distractors: ["一千万", "十億"], explanation: "0が8こで一億" },

  // --- わり算の筆算 ---
  { id: "s-0012", unit: "わり算の筆算", question: "672 ÷ 21 = ?",
    answer: "32", distractors: ["34", "22"], explanation: "21×32=672" },
  { id: "s-0013", unit: "わり算の筆算", question: "84 ÷ 12 = ?",
    answer: "7", distractors: ["6", "8"], explanation: "12×7=84" },

  // --- がい数（四捨五入） ---
  { id: "s-0014", unit: "がい数", question: "3847 を四捨五入して百の位までの概数にすると？",
    answer: "3800", distractors: ["3900", "3850"], explanation: "十の位の4は切り捨てるので3800" },
  { id: "s-0015", unit: "がい数", question: "6250 を四捨五入して千の位までの概数にすると？",
    answer: "6000", distractors: ["7000", "6500"], explanation: "百の位の2は切り捨てるので6000" },

  // --- 小数のかけ算・わり算 ---
  { id: "s-0016", unit: "小数の計算", question: "2.4 × 3 = ?",
    answer: "7.2", distractors: ["6.8", "72"], explanation: "2.4×3=7.2" },
  { id: "s-0017", unit: "小数の計算", question: "6.3 ÷ 3 = ?",
    answer: "2.1", distractors: ["2.3", "21"], explanation: "6.3÷3=2.1" },

  // --- 分数 ---
  { id: "s-0018", unit: "分数", question: "7/3 を帯分数に直すと？",
    answer: "2と1/3", distractors: ["3と1/2", "1と4/3"], explanation: "3×2=6であまり1なので2と1/3" },
  { id: "s-0019", unit: "分数", question: "1/4 と 2/4 を足すと？",
    answer: "3/4", distractors: ["2/8", "1/2"], explanation: "分母が同じなので分子だけ足して3/4" },

  // --- 面積 ---
  { id: "s-0020", unit: "面積", question: "たて4cm・よこ7cmの長方形の面積は？",
    answer: "28cm²", distractors: ["22cm²", "11cm²"], explanation: "4×7=28" },
  { id: "s-0021", unit: "面積", question: "1辺が5cmの正方形の面積は？",
    answer: "25cm²", distractors: ["20cm²", "10cm²"], explanation: "5×5=25" },

  // --- 角度 ---
  { id: "s-0022", unit: "角度", question: "1回転（1周）の角度は？",
    answer: "360°", distractors: ["180°", "90°"], explanation: "1回転は360度" },
  { id: "s-0023", unit: "角度", question: "直角の大きさは？",
    answer: "90°", distractors: ["180°", "45°"], explanation: "直角は90度" },

  // --- 折れ線グラフ・表 ---
  { id: "s-0024", unit: "グラフ・表", question: "折れ線グラフで、線が右上がりになっているとき、数値はどう変化している？",
    answer: "増えている", distractors: ["減っている", "変わっていない"], explanation: "右上がり＝値が増えている" },
  { id: "s-0025", unit: "グラフ・表", question: "折れ線グラフで、線が右下がりになっているとき、数値はどう変化している？",
    answer: "減っている", distractors: ["増えている", "変わっていない"], explanation: "右下がり＝値が減っている" },

  // ============================================================
  // 2026-09-08 追加：全単元スイープ（親が把握していない苦手の洗い出し）
  //   - 2問しかなかった8単元を4問へ増問（3択2問では推測と区別できないため）
  //   - 未収録だった4単元（計算のきまり／変わり方／直方体と立方体／小数のしくみ）を新設
  // ============================================================

  // --- 大きな数（増問） ---
  { id: "s-0032", unit: "大きな数", question: "三億五千万を数字で書くと？",
    answer: "350000000", distractors: ["35000000", "3500000000"], explanation: "一億が3こと千万が5こ＝350000000（0が7こ）" },
  { id: "s-0033", unit: "大きな数", question: "一兆は、一億を何こ集めた数？",
    answer: "1万こ", distractors: ["1000こ", "100万こ"], explanation: "億の1万倍が兆" },
  { id: "s-0064", unit: "大きな数", question: "八億三千万を数字で書くと？",
    answer: "830000000", distractors: ["83000000", "8300000000"], explanation: "億の位が8、千万の位が3で830000000（0が7こ）" },
  { id: "s-0065", unit: "大きな数", question: "一兆を10等分すると？",
    answer: "千億", distractors: ["百億", "一億"], explanation: "兆は億の1万倍。1兆÷10=千億" },

  // --- わり算の筆算（増問） ---
  { id: "s-0034", unit: "わり算の筆算", question: "900 ÷ 30 = ?",
    answer: "30", distractors: ["3", "300"], explanation: "90÷3=30。0を同じ数だけ消して考える" },
  { id: "s-0035", unit: "わり算の筆算", question: "145 ÷ 7 のあまりは？",
    answer: "5", distractors: ["3", "6"], explanation: "7×20=140、145-140=5" },

  // --- がい数（増問） ---
  { id: "s-0036", unit: "がい数", question: "27364 を四捨五入して上から2けたのがい数にすると？",
    answer: "27000", distractors: ["28000", "27400"], explanation: "上から3けた目の3を四捨五入して切り捨て" },
  { id: "s-0037", unit: "がい数", question: "千の位までのがい数にしたとき「4000」になる数はどれ？",
    answer: "3500", distractors: ["3499", "4500"], explanation: "3500は切り上げて4000。3499は3000、4500は5000になる" },

  // --- 小数の計算（増問：たし算・ひき算） ---
  { id: "s-0038", unit: "小数の計算", question: "1.4 + 2.7 = ?",
    answer: "4.1", distractors: ["3.1", "4.11"], explanation: "小数点をそろえて計算する" },
  { id: "s-0039", unit: "小数の計算", question: "5 - 0.8 = ?",
    answer: "4.2", distractors: ["5.2", "4.8"], explanation: "5を5.0と考えて計算する" },

  // --- 分数（増問） ---
  { id: "s-0040", unit: "分数", question: "2と1/5 を仮分数に直すと？",
    answer: "11/5", distractors: ["7/5", "10/5"], explanation: "2×5+1=11 なので 11/5" },
  { id: "s-0041", unit: "分数", question: "1 - 2/5 = ?",
    answer: "3/5", distractors: ["2/5", "1/5"], explanation: "1を5/5と考えて 5/5-2/5=3/5" },

  // --- 面積（増問） ---
  { id: "s-0042", unit: "面積", question: "1辺が1mの正方形の面積は何cm²？",
    answer: "10000cm²", distractors: ["100cm²", "1000cm²"], explanation: "100cm×100cm=10000cm²" },
  { id: "s-0043", unit: "面積", question: "面積が24cm²で、たてが4cmの長方形のよこの長さは？",
    answer: "6cm", distractors: ["8cm", "20cm"], explanation: "24÷4=6" },

  // --- 角度（増問） ---
  { id: "s-0044", unit: "角度", question: "一直線の角度は？",
    answer: "180°", distractors: ["90°", "360°"], explanation: "半回転＝180°" },
  { id: "s-0045", unit: "角度", question: "時計の長いはりが15分で回る角度は？",
    answer: "90°", distractors: ["15°", "180°"], explanation: "15分は1回転の4分の1＝360÷4=90°" },

  // --- グラフ・表（増問） ---
  { id: "s-0046", unit: "グラフ・表", question: "折れ線グラフで、線のかたむきが急なところは、変わり方がどうなっている？",
    answer: "大きく変わっている", distractors: ["変わっていない", "少しだけ変わっている"], explanation: "かたむきが急なほど変化が大きい" },
  { id: "s-0047", unit: "グラフ・表", question: "1日の気温の変わり方を調べるのに合っているグラフは？",
    answer: "折れ線グラフ", distractors: ["ぼうグラフ", "円グラフ"], explanation: "変わり方を見るときは折れ線グラフ" },

  // --- 計算のきまり（新設） ---
  { id: "s-0048", unit: "計算のきまり", question: "12 + 8 × 3 の答えは？",
    answer: "36", distractors: ["60", "44"], explanation: "かけ算を先に計算する。8×3=24、12+24=36" },
  { id: "s-0049", unit: "計算のきまり", question: "(7 + 3) × 5 の答えは？",
    answer: "50", distractors: ["22", "35"], explanation: "( )の中を先に計算する。10×5=50" },
  { id: "s-0050", unit: "計算のきまり", question: "25 × 4 × 7 を計算しやすくするには、どこを先に計算する？",
    answer: "25×4を先に", distractors: ["4×7を先に", "かならず左から順に"], explanation: "25×4=100になり計算が楽になる" },
  { id: "s-0051", unit: "計算のきまり", question: "100 - (30 + 45) の答えは？",
    answer: "25", distractors: ["115", "85"], explanation: "( )の中を先に。30+45=75、100-75=25" },

  // --- 変わり方（新設） ---
  { id: "s-0052", unit: "変わり方", question: "正方形の1辺の長さ□cmと、まわりの長さ○cmの関係を式にすると？",
    answer: "○=□×4", distractors: ["○=□+4", "○=□×□"], explanation: "辺が4つあるので□×4" },
  { id: "s-0053", unit: "変わり方", question: "1個80円のパンを□個買ったときの代金○円を式にすると？",
    answer: "○=80×□", distractors: ["○=80+□", "○=80÷□"], explanation: "1個の値段×個数＝代金" },
  { id: "s-0054", unit: "変わり方", question: "18このあめを□人で同じ数ずつ分けるとき、1人分○こを式にすると？",
    answer: "○=18÷□", distractors: ["○=18×□", "○=18-□"], explanation: "全体÷人数＝1人分" },
  { id: "s-0055", unit: "変わり方", question: "たすと20になる2つの数□と○の関係を式にすると？",
    answer: "○=20-□", distractors: ["○=20+□", "○=20÷□"], explanation: "□が決まれば残りが○になる" },

  // --- 直方体と立方体（新設） ---
  { id: "s-0056", unit: "直方体と立方体", question: "立方体の面はいくつある？",
    answer: "6つ", distractors: ["4つ", "8つ"], explanation: "さいころと同じで面は6つ" },
  { id: "s-0057", unit: "直方体と立方体", question: "直方体の頂点はいくつある？",
    answer: "8つ", distractors: ["6つ", "12こ"], explanation: "角（かど）が8つ" },
  { id: "s-0058", unit: "直方体と立方体", question: "直方体の辺は何本ある？",
    answer: "12本", distractors: ["8本", "6本"], explanation: "たて・よこ・高さが4本ずつで12本" },
  { id: "s-0059", unit: "直方体と立方体", question: "直方体で、1つの面に垂直な面はいくつある？",
    answer: "4つ", distractors: ["2つ", "6つ"], explanation: "向かい合う面は平行、まわりの4つが垂直" },

  // --- 小数のしくみ（新設：位取りの理解。計算とは分けて測る） ---
  { id: "s-0060", unit: "小数のしくみ", question: "0.1 を10こ集めた数は？",
    answer: "1", distractors: ["0.01", "10"], explanation: "0.1が10こで1になる" },
  { id: "s-0061", unit: "小数のしくみ", question: "3.14 の「1」は何の位？",
    answer: "10分の1の位", distractors: ["100分の1の位", "一の位"], explanation: "小数第一位＝10分の1の位" },
  { id: "s-0062", unit: "小数のしくみ", question: "0.01 を100こ集めた数は？",
    answer: "1", distractors: ["0.1", "10"], explanation: "0.01×100=1" },
  { id: "s-0063", unit: "小数のしくみ", question: "2.5 を10倍した数は？",
    answer: "25", distractors: ["0.25", "250"], explanation: "10倍すると小数点が右に1つ動く" },
];

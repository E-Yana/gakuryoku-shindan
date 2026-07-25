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
];

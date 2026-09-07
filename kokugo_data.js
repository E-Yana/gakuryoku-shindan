// ============================================================
// 国語 判定テスト 問題バンク（小4・2026-09-08 新設）
//   - 目的は「親が把握していない苦手単元の洗い出し」。1単元4問・3択
//     （3問だと推測期待値33%で「本当に苦手」か「ケアレス」か切り分けられないため）
//   - kanji_drill/ が担当する「漢字の読み書きそのもの」は含めない
//     （重複して測っても打ち手が変わらないため。部首・熟語の組み立てなど
//       "漢字の知識" 側だけを扱う）
//   - 読解（説明文・物語文の内容理解）も含めない
//     （reports/kids/読解力_情緒語彙_継続プログラム_202609.md が別途測定中。
//       推論の弱さは既に判明しており、ここで再測定しても打ち手が変わらない）
//   - 詳細: reports/kids/算数図形_改善プログラム_202608.md
// ============================================================

window.KOKUGO_PROBLEMS = [
  // --- 漢字のしくみ:部首 ---
  { id: "g-0001", unit: "漢字のしくみ:部首", question: "「花」「草」「茶」に共通する部首は？",
    answer: "くさかんむり", distractors: ["たけかんむり", "うかんむり"], explanation: "植物に関係する漢字につく「くさかんむり」" },
  { id: "g-0002", unit: "漢字のしくみ:部首", question: "「にんべん」がつく漢字はどれ？",
    answer: "休", distractors: ["池", "空"], explanation: "「休」は人＋木。「池」はさんずい、「空」はあなかんむり" },
  { id: "g-0003", unit: "漢字のしくみ:部首", question: "「開」「間」に共通する部首は？",
    answer: "もんがまえ", distractors: ["くにがまえ", "しんにょう"], explanation: "門の形をした部首が「もんがまえ」" },
  { id: "g-0004", unit: "漢字のしくみ:部首", question: "「氵（さんずい）」がつく漢字はどれ？",
    answer: "海", distractors: ["林", "空"], explanation: "さんずいは水に関係する漢字につく。「林」はきへん" },

  // --- 熟語の組み立て ---
  { id: "g-0005", unit: "熟語の組み立て", question: "「大小」のように、反対の意味の漢字を組み合わせた熟語はどれ？",
    answer: "高低", distractors: ["読書", "学校"], explanation: "高⇔低で反対の意味の組み合わせ" },
  { id: "g-0006", unit: "熟語の組み立て", question: "「読書」は「書を読む」と読める。この組み立ては？",
    answer: "下の字が上の字の目的になっている", distractors: ["似た意味の字を重ねた", "反対の意味の字を重ねた"], explanation: "「書（を）読む」＝下が目的語になる型" },
  { id: "g-0007", unit: "熟語の組み立て", question: "「岩石」のように、似た意味の漢字を重ねた熟語はどれ？",
    answer: "絵画", distractors: ["高低", "乗車"], explanation: "絵と画はどちらも「え」の意味" },
  { id: "g-0008", unit: "熟語の組み立て", question: "「国語」「昼食」のように、上の字が下の字をくわしくしている熟語はどれ？",
    answer: "白紙", distractors: ["天地", "出欠"], explanation: "「白い紙」＝上が下をくわしくする型。天地・出欠は反対の意味" },

  // --- 送りがな ---
  { id: "g-0009", unit: "送りがな", question: "「あたらしい」を漢字と送りがなで正しく書くと？",
    answer: "新しい", distractors: ["新らしい", "新い"], explanation: "「新しい」が正しい送りがな" },
  { id: "g-0010", unit: "送りがな", question: "「たのしい」の正しい送りがなは？",
    answer: "楽しい", distractors: ["楽のしい", "楽い"], explanation: "「楽しい」が正しい" },
  { id: "g-0011", unit: "送りがな", question: "「かんがえる」の正しい送りがなは？",
    answer: "考える", distractors: ["考がえる", "考る"], explanation: "「考える」が正しい" },
  { id: "g-0012", unit: "送りがな", question: "「あつまる」の正しい送りがなは？",
    answer: "集まる", distractors: ["集つまる", "集る"], explanation: "「集まる」が正しい" },

  // --- 同じ読みの漢字 ---
  { id: "g-0013", unit: "同じ読みの漢字", question: "「体をあらう」の「あらう」を漢字で書くと？",
    answer: "洗う", distractors: ["会う", "合う"], explanation: "水であらうのは「洗う」" },
  { id: "g-0014", unit: "同じ読みの漢字", question: "「学校にかよう」の「かよう」を漢字で書くと？",
    answer: "通う", distractors: ["使う", "追う"], explanation: "行き来するのは「通う」" },
  { id: "g-0015", unit: "同じ読みの漢字", question: "「はやく走る」の「はやく」を漢字で書くと？",
    answer: "速く", distractors: ["早く", "速い"], explanation: "スピードは「速い」、時こくは「早い」" },
  { id: "g-0016", unit: "同じ読みの漢字", question: "「けんこうに気をつける」の「けんこう」を漢字で書くと？",
    answer: "健康", distractors: ["見学", "研究"], explanation: "体の調子は「健康」" },

  // --- 主語・述語 ---
  { id: "g-0017", unit: "主語・述語", question: "「弟が　公園で　元気に　遊ぶ。」の主語はどれ？",
    answer: "弟が", distractors: ["公園で", "遊ぶ"], explanation: "「だれが」にあたるのが主語" },
  { id: "g-0018", unit: "主語・述語", question: "「弟が　公園で　元気に　遊ぶ。」の述語はどれ？",
    answer: "遊ぶ", distractors: ["弟が", "元気に"], explanation: "「どうする」にあたるのが述語" },
  { id: "g-0019", unit: "主語・述語", question: "「妹は　とても　やさしい。」の述語はどれ？",
    answer: "やさしい", distractors: ["妹は", "とても"], explanation: "「どんなだ」にあたる言葉も述語になる" },
  { id: "g-0020", unit: "主語・述語", question: "主語とは、文の中でどんなはたらきをする言葉？",
    answer: "「だれが・何が」にあたる言葉", distractors: ["「どうする」にあたる言葉", "様子をくわしくする言葉"], explanation: "主語＝だれが・何が。述語＝どうする・どんなだ" },

  // --- 修飾語 ---
  { id: "g-0021", unit: "修飾語", question: "「白い　花が　さいた。」で「白い」がくわしくしている言葉はどれ？",
    answer: "花が", distractors: ["さいた", "白い"], explanation: "「白い」は「花」の様子をくわしくしている" },
  { id: "g-0022", unit: "修飾語", question: "「ゆっくり　歩く。」で「ゆっくり」がくわしくしている言葉はどれ？",
    answer: "歩く", distractors: ["ゆっくり", "どれもくわしくしていない"], explanation: "「ゆっくり」は動きの様子をくわしくしている" },
  { id: "g-0023", unit: "修飾語", question: "修飾語とはどんな言葉？",
    answer: "他の言葉をくわしく説明する言葉", distractors: ["文の主人公を表す言葉", "文と文をつなぐ言葉"], explanation: "くわしく説明するのが修飾語。つなぐのは接続語" },
  { id: "g-0024", unit: "修飾語", question: "「大きな　犬が　わんと　ほえた。」で修飾語はどれ？",
    answer: "大きな", distractors: ["犬が", "ほえた"], explanation: "「犬が」は主語、「ほえた」は述語、「大きな」が修飾語" },

  // --- 接続語 ---
  { id: "g-0025", unit: "接続語", question: "「雨がふった。（　）試合は中止になった。」に入る言葉は？",
    answer: "だから", distractors: ["しかし", "ところで"], explanation: "前が原因で後が結果なので「だから」" },
  { id: "g-0026", unit: "接続語", question: "「たくさん練習した。（　）試合に負けた。」に入る言葉は？",
    answer: "しかし", distractors: ["だから", "それに"], explanation: "予想と反対のことが続くので「しかし」" },
  { id: "g-0027", unit: "接続語", question: "「魚がすきだ。（　）肉もすきだ。」に入る言葉は？",
    answer: "それに", distractors: ["だから", "つまり"], explanation: "つけ加えるときは「それに」" },
  { id: "g-0028", unit: "接続語", question: "「くだものがすきだ。（　）りんごがとくにすきだ。」に入る言葉は？",
    answer: "たとえば", distractors: ["しかし", "だから"], explanation: "例をあげるときは「たとえば」" },

  // --- 慣用句 ---
  { id: "g-0029", unit: "慣用句", question: "「（　）が広い」は知り合いが多いこと。（　）に入るのは？",
    answer: "顔", distractors: ["手", "足"], explanation: "「顔が広い」＝知り合いが多い" },
  { id: "g-0030", unit: "慣用句", question: "「（　）を貸す」は手伝うこと。（　）に入るのは？",
    answer: "手", distractors: ["耳", "首"], explanation: "「手を貸す」＝手伝う。「耳を貸す」は話を聞く" },
  { id: "g-0031", unit: "慣用句", question: "「（　）が高い」はじまんに思うこと。（　）に入るのは？",
    answer: "鼻", distractors: ["目", "頭"], explanation: "「鼻が高い」＝ほこらしい" },
  { id: "g-0032", unit: "慣用句", question: "「油を売る」の意味は？",
    answer: "むだ話をしてなまける", distractors: ["品物を安く売る", "一生けんめい働く"], explanation: "仕事の途中でなまけることを「油を売る」という" },

  // --- ことわざ ---
  { id: "g-0033", unit: "ことわざ", question: "「さるも木から（　）」に入る言葉は？",
    answer: "おちる", distractors: ["のぼる", "はしる"], explanation: "名人でも失敗することがある、という意味" },
  { id: "g-0034", unit: "ことわざ", question: "「ちりも積もれば（　）となる」に入る言葉は？",
    answer: "山", distractors: ["川", "森"], explanation: "小さなことも積み重なれば大きくなる" },
  { id: "g-0035", unit: "ことわざ", question: "「急がば（　）」に入る言葉は？",
    answer: "まわれ", distractors: ["はしれ", "やすめ"], explanation: "急ぐときほど、遠回りでも安全な道を行くほうが結局早く着く" },
  { id: "g-0036", unit: "ことわざ", question: "「石の上にも（　）年」に入る数は？",
    answer: "三", distractors: ["五", "十"], explanation: "がまん強く続ければいつか成功する" },

  // --- 辞書の使い方 ---
  { id: "g-0037", unit: "辞書の使い方", question: "国語辞典で言葉がならんでいる順は？",
    answer: "あいうえお順", distractors: ["画数の少ない順", "漢字の意味の順"], explanation: "国語辞典は五十音（あいうえお）順" },
  { id: "g-0038", unit: "辞書の使い方", question: "国語辞典で先に出てくるのはどっち？「あき」と「あさ」",
    answer: "あき", distractors: ["あさ", "同じところに出てくる"], explanation: "2文字目が「き」＜「さ」なので「あき」が先" },
  { id: "g-0039", unit: "辞書の使い方", question: "漢字辞典で、読み方が分からない漢字をさがすときに使うのは？",
    answer: "部首さくいん", distractors: ["音訓さくいん", "五十音さくいん"], explanation: "読めないときは部首から引く。読めるときは音訓さくいん" },
  { id: "g-0040", unit: "辞書の使い方", question: "国語辞典で「かっこ」と「がっこう」はどちらが先に出てくる？",
    answer: "かっこ", distractors: ["がっこう", "同じところに出てくる"], explanation: "にごらない音（清音）が先にならぶ" },

  // --- ローマ字 ---
  { id: "g-0041", unit: "ローマ字", question: "「さくら」をローマ字で書くと？",
    answer: "sakura", distractors: ["sakula", "sakra"], explanation: "ら行は r を使う" },
  { id: "g-0042", unit: "ローマ字", question: "「きって」のような小さい「っ」は、ローマ字でどう書く？",
    answer: "次の音のはじめの字を重ねる", distractors: ["tsu と書く", "書かない"], explanation: "kitte のように子音を重ねる" },
  { id: "g-0043", unit: "ローマ字", question: "「ねこ」をローマ字で書くと？",
    answer: "neko", distractors: ["neco", "nako"], explanation: "か行は k を使う" },
  { id: "g-0044", unit: "ローマ字", question: "ローマ字で人の名前を書くとき、はじめの文字はどうする？",
    answer: "大文字にする", distractors: ["小文字にする", "どちらでもよい"], explanation: "名前や地名のはじめは大文字で書く" },

  // --- ていねいな言い方 ---
  { id: "g-0045", unit: "ていねいな言い方", question: "「行く」をていねいな言い方にすると？",
    answer: "行きます", distractors: ["行った", "行こう"], explanation: "「です・ます」をつけるとていねいな言い方になる" },
  { id: "g-0046", unit: "ていねいな言い方", question: "作文（書き言葉）にふさわしい言い方はどれ？",
    answer: "とても楽しかったです", distractors: ["めっちゃ楽しかった", "楽しかったっす"], explanation: "話し言葉のくだけた言い方は作文には使わない" },
  { id: "g-0047", unit: "ていねいな言い方", question: "「です・ます」を使った言い方を何という？",
    answer: "ていねいな言い方", distractors: ["ふつうの言い方", "みじかい言い方"], explanation: "「だ・である」はふつうの言い方" },
  { id: "g-0048", unit: "ていねいな言い方", question: "人が話した言葉につける記号はどれ？",
    answer: "「　」", distractors: ["（　）", "。"], explanation: "会話文はかぎ（「」）でくくる" },
];

import React, { useState } from 'react';
import './App.css';

const MOCK_MENUS = [
  { id: 1, shop: "マクドナルド", name: "ハンバーガー", p: 12.8, f: 9.4, c: 30.3, kcal: 256, address: "マクドナルド", category: "バーガー・カフェ" },
  { id: 2, shop: "マクドナルド", name: "エグチ（エッグチーズバーガー）", p: 22.3, f: 18.9, c: 31.0, kcal: 387, address: "マクドナルド", category: "バーガー・カフェ" },
  { id: 3, shop: "マクドナルド", name: "ダブルチーズバーガー", p: 26.5, f: 25.0, c: 31.4, kcal: 457, address: "マクドナルド", category: "バーガー・カフェ" },
  { id: 7, shop: "スターバックス", name: "根菜チキン サラダラップ", p: 8.3, f: 10.9, c: 23.3, kcal: 224, address: "スターバックス", category: "バーガー・カフェ" },
  { id: 22, shop: "モスバーガー", name: "モスの菜摘 テリヤキチキン", p: 13.5, f: 11.2, c: 8.5, kcal: 188, address: "モスバーガー", category: "バーガー・カフェ" },
  { id: 35, shop: "サブウェイ", name: "チリチキン（ウィート）", p: 15.6, f: 3.1, c: 31.9, kcal: 217, address: "サブウェイ", category: "バーガー・カフェ" },
  { id: 36, shop: "サブウェイ", name: "ローストチキン（ウィート）", p: 15.3, f: 4.1, c: 32.5, kcal: 228, address: "サブウェイ", category: "バーガー・カフェ" },
  { id: 37, shop: "コメダ珈琲店", name: "定番モーニングC（おぐらあん）", p: 8.5, f: 7.9, c: 52.1, kcal: 312, address: "コメダ珈琲店", category: "バーガー・カフェ" },
  { id: 4, shop: "すき家", name: "とりそぼろ丼（並盛）", p: 35.5, f: 11.2, c: 84.1, kcal: 579, address: "すき家", category: "肉・定食" },
  { id: 5, shop: "すき家", name: "まぐろたたき丼（並盛）", p: 30.8, f: 7.4, c: 85.3, kcal: 531, address: "すき家", category: "肉・定食" },
  { id: 14, shop: "吉野家", name: "牛丼（並盛）", p: 20.2, f: 20.4, c: 92.1, kcal: 633, address: "吉野家", category: "肉・定食" },
  { id: 15, shop: "吉野家", name: "牛鮭定食", p: 29.8, f: 23.2, c: 93.5, kcal: 698, address: "吉野家", category: "肉・定食" },
  { id: 16, shop: "松屋", name: "牛めし（並盛）", p: 18.9, f: 23.6, c: 94.5, kcal: 669, address: "松屋", category: "肉・定食" },
  { id: 18, shop: "ケンタッキー", name: "オリジナルチキン（1P）", p: 18.3, f: 14.7, c: 7.9, kcal: 237, address: "ケンタッキーフライドチキン", category: "肉・定食" },
  { id: 20, shop: "ココイチ", name: "イカカレー（ご飯200g）", p: 15.2, f: 16.5, c: 92.1, kcal: 578, address: "ココイチ", category: "肉・定食" },
  { id: 32, shop: "ジョイフル", name: "チキンステーキ（和風ソース）", p: 32.4, f: 24.1, c: 4.5, kcal: 368, address: "ジョイフル", category: "肉・定食" },
  { id: 33, shop: "大戸屋", name: "しまほっけの炭火焼き定食", p: 32.1, f: 9.8, c: 75.2, kcal: 536, address: "大戸屋", category: "肉・定食" },
  { id: 38, shop: "びっくりドンキー", name: "イカの箱舟", p: 18.2, f: 12.1, c: 5.4, kcal: 205, address: "びっくりドンキー", category: "肉・定食" },
  { id: 9, shop: "ガスト", name: "若鶏のグリル（1枚）", p: 23.4, f: 20.1, c: 1.5, kcal: 284, address: "ガスト", category: "中華・うどん・他" },
  { id: 11, shop: "サイゼリヤ", name: "辛味チキン（4本）", p: 17.2, f: 20.4, c: 3.5, kcal: 268, address: "サイゼリヤ", category: "中華・うどん・他" },
  { id: 24, shop: "丸亀製麺", name: "かけうどん（並）＋かしわ天", p: 21.3, f: 10.5, c: 68.2, kcal: 452, address: "丸亀製麺", category: "中華・うどん・他" },
  { id: 26, shop: "餃子の王将", name: "にんにくゼロ生姜刺身風餃子", p: 10.5, f: 11.2, c: 26.5, kcal: 248, address: "餃子の王将", category: "中華・うどん・他" },
  { id: 28, shop: "スシロー", name: "マグロ・エビ・イカ（3皿計）", p: 22.4, f: 2.1, c: 62.4, kcal: 358, address: "スシロー", category: "寿司" },
  { id: 30, shop: "はま寿司", name: "つぶ貝・タコ・ホタテ（3皿計）", p: 20.8, f: 1.5, c: 59.8, kcal: 335, address: "はま寿司", category: "寿司" },
  { id: 31, shop: "くら寿司", name: "シャリ野菜 ビントロ", p: 8.5, f: 3.2, c: 2.1, kcal: 72, address: "くら寿司", category: "寿司" }
];

function App() {
  const [protein, setProtein] = useState<number>(20);
  const [fat, setFat] = useState<number>(15);
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [currentMode, setCurrentMode] = useState<string>("カスタム");
  const [theme, setTheme] = useState<string>("theme-red");

  const applyPreset = (modeName: string, pValue: number, fValue: number) => {
    setCurrentMode(modeName);
    setProtein(pValue);
    setFat(fValue);
  };

  const filteredMenus = MOCK_MENUS.filter(menu => {
    const matchPfc = menu.p >= protein && menu.f <= fat;
    const matchCategory = selectedCategory === "すべて" || menu.category === selectedCategory;
    return matchPfc && matchCategory;
  });

  const openMap = (shopName: string) => {
    const encodedShop = encodeURIComponent(shopName);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedShop}`;
    window.open(mapUrl, '_blank');
  };

  // ★ 改善：キャラクターは「PFCくん」に統一、セリフは短くシンプルに！
  const getTrainerMessage = () => {
    const count = filteredMenus.length;
    if (count === 0) {
      return "条件に合うメニューがないよ。条件を少し緩めてみてね！";
    }
    return `現在の条件に合う優秀メニューが ${count} 件見つかったよ！`;
  };

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="app-container">
        
        {/* テーマセレクター */}
        <div className="theme-selector">
          <span className="theme-label">🎨 スタイル:</span>
          <button className={`theme-dot dot-red ${theme === 'theme-red' ? 'active' : ''}`} onClick={() => setTheme('theme-red')} />
          <button className={`theme-dot dot-green ${theme === 'theme-green' ? 'active' : ''}`} onClick={() => setTheme('theme-green')} />
          <button className={`theme-dot dot-light ${theme === 'theme-light' ? 'active' : ''}`} onClick={() => setTheme('theme-light')} />
        </div>

        <h1>PFC外食マップ</h1>
        <p className="app-subtitle">お店に入る前に、理想のPFCメニューがある周辺店舗を検索</p>

        {/* ★ 改善：スッキリしたワンラインのキャラクターBOX */}
        <div className="trainer-box">
          <div className="trainer-avatar">🤖</div>
          <div className="trainer-content">
            <span className="trainer-name">PFCくん:</span>
            <span className="trainer-bubble">{getTrainerMessage()}</span>
          </div>
        </div>

        {/* マイパターン選択 */}
        <div className="preset-container">
          <button className={`preset-btn ${currentMode === "厳しめ減量" ? "active" : ""}`} onClick={() => applyPreset("厳しめ減量", 25, 8)}>
            🏃‍♂️ 減量 (P25/F8)
          </button>
          <button className={`preset-btn ${currentMode === "バルクアップ" ? "active" : ""}`} onClick={() => applyPreset("バルクアップ", 30, 25)}>
            💪 増量 (P30/F25)
          </button>
          <button className={`preset-btn ${currentMode === "ヘルシー維持" ? "active" : ""}`} onClick={() => applyPreset("ヘルシー維持", 15, 12)}>
            🥗 維持 (P15/F12)
          </button>
        </div>

        {/* スライダーエリア */}
        <div className="filter-box">
          <div className="slider-group">
            <label>
              <span>タンパク質 (P)</span>
              <span className="value-badge">{protein}g 以上</span>
            </label>
            <input type="range" min="0" max="50" value={protein} onChange={(e) => { setProtein(Number(e.target.value)); setCurrentMode("カスタム"); }} />
          </div>
          <div className="slider-group">
            <label>
              <span>脂質 (F)</span>
              <span className="value-badge">{fat}g 以下</span>
            </label>
            <input type="range" min="0" max="40" value={fat} onChange={(e) => { setFat(Number(e.target.value)); setCurrentMode("カスタム"); }} />
          </div>
        </div>

        {/* ジャンル選択ボタン */}
        <div className="category-container">
          {["すべて", "バーガー・カフェ", "肉・定食", "寿司", "中華・うどん・他"].map(cat => (
            <button key={cat} className={`category-btn ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* 結果一覧エリア */}
        <div className="results-box">
          <h3>条件に合うメニュー ({filteredMenus.length}件)</h3>
          {filteredMenus.length === 0 ? (
            <p className="no-result">条件に合うメニューがありません 😢</p>
          ) : (
            filteredMenus.map(menu => (
              <div key={menu.id} className="menu-card">
                <div className="menu-header">
                  <span className="shop-name">{menu.shop}</span>
                  <button className="map-inline-btn" onClick={() => openMap(menu.shop)}>マップで開く 📍</button>
                </div>
                <div className="menu-name">{menu.name}</div>
                <div className="pfc-values">
                  <span>P: {menu.p}g</span>
                  <span>F: {menu.f}g</span>
                  <span>C: {menu.c}g</span>
                  <span className="kcal">{menu.kcal} kcal</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
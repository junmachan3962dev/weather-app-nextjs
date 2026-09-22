'use client'

import { useState } from "react";
import { Search } from "lucide-react";

export function HeaderBarComponent() {
  const [city, setCity] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    console.log("検索", city);
    //あとでAPI Route に cityを送る処理を追加する
  }

  return (
    <header className="flex items-center justify-between pl-4 pr-4">
      {/* 都市名入力欄 */}
      <form onSubmit={handleSearch} className="flex items-center pl-2 border border-gray-200 rounded-2xl cursor-pointer">
        <Search className="w-4 h-4" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="都市名を入力してください"
          className="w-[200px] px-4 py-2 text-sm text-right placeholder:text-center outline-none"
        />
      </form>
      {/* ライトモード・ダークモード切り替えボタン（確認用） */}
      <button>Theme</button>
    </header>
  );
}

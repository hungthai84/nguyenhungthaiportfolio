import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { Users, AlertCircle, CheckCircle, Heart, XCircle } from 'lucide-react';

const zodiacs = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
const zodiacsEn = ["Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat"];

export function AgeCompatibilityTool() {
  const { lang } = useLanguage();
  const [year1, setYear1] = useState<number | ''>('');
  const [year2, setYear2] = useState<number | ''>('');
  const [result, setResult] = useState<{ status: 'good' | 'bad' | 'neutral', messageVi: string, messageEn: string } | null>(null);

  const calculateCompatibility = () => {
    if (!year1 || !year2 || year1 < 1900 || year2 < 1900) return;
    
    const z1 = year1 % 12;
    const z2 = year2 % 12;
    
    const zName1Vi = zodiacs[z1];
    const zName2Vi = zodiacs[z2];
    const zName1En = zodiacsEn[z1];
    const zName2En = zodiacsEn[z2];
    
    const diff = Math.abs(z1 - z2);
    
    // Lục Hợp pairs (sum of indices modulo 12 rules, or just hardcode)
    // 4:Tý-5:Sửu, 6:Dần-3:Hợi, 7:Mão-2:Tuất, 8:Thìn-1:Dậu, 9:Tỵ-0:Thân, 10:Ngọ-11:Mùi
    const lucHop = [
      [4,5], [5,4], [6,3], [3,6], [7,2], [2,7], [8,1], [1,8], [9,0], [0,9], [10,11], [11,10]
    ];
    const isLucHop = lucHop.some(pair => pair[0] === z1 && pair[1] === z2);
    
    // Lục Hại: 4:Tý-11:Mùi, 5:Sửu-10:Ngọ, 6:Dần-9:Tỵ, 7:Mão-8:Thìn, 0:Thân-3:Hợi, 1:Dậu-2:Tuất
    const lucHai = [
      [4,11], [11,4], [5,10], [10,5], [6,9], [9,6], [7,8], [8,7], [0,3], [3,0], [1,2], [2,1]
    ];
    const isLucHai = lucHai.some(pair => pair[0] === z1 && pair[1] === z2);

    if (isLucHop) {
      setResult({ status: 'good', messageVi: `Lục Hợp (Rất tốt): ${zName1Vi} và ${zName2Vi} rất hòa hợp, hỗ trợ nhau.`, messageEn: `Six Harmonies (Very Good): ${zName1En} and ${zName2En} are highly compatible.` });
    } else if (diff === 4 || diff === 8) {
      setResult({ status: 'good', messageVi: `Tam Hợp (Tốt): ${zName1Vi} và ${zName2Vi} có tính cách tương đồng, dễ đồng cảm.`, messageEn: `Three Harmonies (Good): ${zName1En} and ${zName2En} share similar traits and empathize easily.` });
    } else if (diff === 6) {
      setResult({ status: 'bad', messageVi: `Lục Xung (Xấu): ${zName1Vi} và ${zName2Vi} trái ngược tính cách, dễ xung đột.`, messageEn: `Six Conflicts (Bad): ${zName1En} and ${zName2En} have opposing personalities, prone to conflict.` });
    } else if (isLucHai) {
      setResult({ status: 'bad', messageVi: `Lục Hại (Xấu): ${zName1Vi} và ${zName2Vi} cản trở, kìm hãm lẫn nhau.`, messageEn: `Six Harms (Bad): ${zName1En} and ${zName2En} may hinder each other.` });
    } else if (diff === 3 || diff === 9) {
      setResult({ status: 'bad', messageVi: `Tứ Hành Xung (Xấu): ${zName1Vi} và ${zName2Vi} khắc khẩu, khó hòa hợp.`, messageEn: `Four Conflicts (Bad): ${zName1En} and ${zName2En} often clash.` });
    } else {
      setResult({ status: 'neutral', messageVi: `Bình Hòa (Bình thường): ${zName1Vi} và ${zName2Vi} không hình khắc, không tương hợp đặc biệt.`, messageEn: `Neutral (Normal): ${zName1En} and ${zName2En} are neither particularly compatible nor clashing.` });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md p-6 my-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {lang === 'vi' ? 'Công cụ xem Tuổi Hợp - Xung' : 'Age Compatibility Tool'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'vi' ? 'Kiểm tra mức độ hòa hợp giữa hai năm sinh' : 'Check compatibility between two birth years'}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {lang === 'vi' ? 'Năm sinh người 1' : 'Person 1 Birth Year'}
          </label>
          <input 
            type="number" 
            placeholder="VD: 1984"
            value={year1}
            onChange={(e) => setYear1(e.target.value ? parseInt(e.target.value) : '')}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {lang === 'vi' ? 'Năm sinh người 2' : 'Person 2 Birth Year'}
          </label>
          <input 
            type="number" 
            placeholder="VD: 1990"
            value={year2}
            onChange={(e) => setYear2(e.target.value ? parseInt(e.target.value) : '')}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex items-end">
          <button 
            onClick={calculateCompatibility}
            disabled={!year1 || !year2 || year1.toString().length < 4 || year2.toString().length < 4}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {lang === 'vi' ? 'Xem Kết Quả' : 'Calculate'}
          </button>
        </div>
      </div>

      {result && (
        <div className={`p-4 rounded-xl border flex gap-3 ${
          result.status === 'good' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' :
          result.status === 'bad' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300' :
          'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300'
        }`}>
          <div className="shrink-0 mt-0.5">
            {result.status === 'good' && <Heart className="w-5 h-5 text-emerald-500" />}
            {result.status === 'bad' && <XCircle className="w-5 h-5 text-rose-500" />}
            {result.status === 'neutral' && <CheckCircle className="w-5 h-5 text-slate-500" />}
          </div>
          <div className="text-sm font-medium leading-relaxed">
            {lang === 'vi' ? result.messageVi : result.messageEn}
          </div>
        </div>
      )}
    </div>
  );
}

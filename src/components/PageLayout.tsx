import React, { ReactNode, ElementType } from "react";
import { cn } from "../lib/utils";
import { PageBanner } from "./PageBanner";
import { useLanguage } from "../context/LanguageContext";

interface PageLayoutProps {
  id?: string;
  rootClassName?: string;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  headerContainerClassName?: string;
  className?: string;
  contentContainerClassName?: string;
  pageId?: string;
  pageName?: string;
  title: string;
  subtitle?: string;
  icon?: ElementType;
  children: ReactNode;
  hideToolbar?: boolean;
  hideBanner?: boolean;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  groupOptions?: any[];
  activeGroup?: string;
  onGroupChange?: (cat: string) => void;
  groupLabel?: { vi: string; en: string };
  onReset?: () => void;
  totalCount?: number;
  filteredCount?: number;
  bannerTag?: string;
  bannerIconType?: string;
  bannerGradient?: string;
}

export function PageLayout({
  id = "section-main",
  rootClassName,
  headerClassName,
  headerStyle,
  headerContainerClassName,
  className,
  contentContainerClassName,
  title,
  subtitle,
  icon: Icon,
  children,
  pageId,
  bannerTag,
  bannerIconType,
  bannerGradient,
  hideBanner,
  hideToolbar,
  groupOptions,
  activeGroup,
  onGroupChange,
  groupLabel,
  onReset,
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  totalCount,
  filteredCount,
}: PageLayoutProps) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  return (
    <section
      id={id}
      className={cn(
        "w-full max-w-7xl mx-auto flex flex-col min-h-full px-3 sm:px-6 py-4 sm:py-5",
        rootClassName
      )}
      style={headerStyle}
    >
      {/* SECTION HEADER BANNER */}
      {!hideBanner && (
        <div className={cn("mb-[10px] w-full", headerClassName)}>
          <PageBanner 
            title={title}
            subtitle={subtitle || ""}
            tag={bannerTag || (isVi ? "TỔNG QUAN" : "OVERVIEW")}
            iconType={bannerIconType || pageId || "feature"}
            gradient={bannerGradient}
            className={pageId === "interview" ? "h-[193px]" : ""}
          />
        </div>
      )}

      {/* INTERACTIVE GROUP OPTIONS & TOOLBAR */}
      {!hideToolbar && groupOptions && groupOptions.length > 0 && (
        <div className="w-full flex items-center justify-between flex-wrap gap-2.5 mb-4 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            {groupLabel && (
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
                {isVi ? groupLabel.vi : groupLabel.en}
              </span>
            )}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex-wrap">
              {groupOptions.map((opt) => {
                const isActive = activeGroup === opt.id;
                const OptIcon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onGroupChange?.(opt.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer outline-none",
                      isActive
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/60 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-900/50"
                    )}
                  >
                    {OptIcon && <OptIcon className="w-3.5 h-3.5" />}
                    <span>{isVi ? opt.labelVi : opt.labelEn}</span>
                    {typeof opt.count === "number" && (
                      <span
                        className={cn(
                          "px-1.5 py-0.2 rounded-full text-[10px] font-extrabold",
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                            : "bg-slate-200/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400"
                        )}
                      >
                        {opt.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
            >
              {isVi ? "Đặt lại" : "Reset"}
            </button>
          )}
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className={cn("w-full flex-1 flex flex-col gap-[10px]", className)}>
        {children}
      </div>
    </section>
  );
}

export default PageLayout;


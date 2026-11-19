import { Check, ChevronDown, ListFilter } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useId, useRef, useState } from 'react';
import { STACK_GROUPS } from '../data/portfolio';
import { Reveal } from './Reveal';

const ALL = 'all';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface StackFilterProps {
  options: FilterOption[];
  value: string;
  onChange: (id: string) => void;
}

/**
 * Category picker for the stack grid. A dropdown rather than a row of chips:
 * ten categories wrap into three lines on a phone, and the list keeps growing
 * with every group added.
 */
function StackFilter({ options, value, onChange }: StackFilterProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.id === value)
  );
  const selected = options[selectedIndex];

  const openMenu = () => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) {
      triggerRef.current?.focus();
    }
  };

  const choose = (index: number) => {
    onChange(options[index].id);
    close();
  };

  // Move focus into the list so the arrow keys work straight away.
  useEffect(() => {
    if (open) {
      listRef.current?.focus();
    }
  }, [open]);

  // Ten options exceed the menu's height cap, so keep the active one visible
  // when arrowing or hovering. Scroll the menu only, never the page.
  useEffect(() => {
    if (!open) return;

    const list = listRef.current;
    const option = list?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`
    );
    if (!list || !option) return;

    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < list.scrollTop) {
      list.scrollTop = top;
    } else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight;
    }
  }, [open, activeIndex]);

  // A pointer press anywhere else dismisses the menu.
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      openMenu();
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(
          (index) => (index - 1 + options.length) % options.length
        );
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        choose(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'Tab':
        // Closing removes the focused node, so hand focus back to the trigger
        // instead of letting it fall to <body>.
        event.preventDefault();
        close();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={wrapRef} className="relative w-full sm:w-[248px]">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`Filter technologies by category: ${selected.label}`}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        className="flex min-h-[44px] w-full items-center gap-2.5 rounded-xl border border-slate-900/[0.09] bg-white/70 px-3.5 text-left text-sm font-medium text-slate-800 transition-colors hover:border-slate-900/20 hover:text-slate-950 dark:border-white/[0.09] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-white/20 dark:hover:text-white"
      >
        <ListFilter className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
        <span className="min-w-0 flex-1 truncate">{selected.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 dark:text-slate-400 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Technology categories"
            aria-activedescendant={`${listId}-${options[activeIndex].id}`}
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="glass-nav-floating absolute right-0 z-30 mt-2 max-h-[min(340px,60vh)] w-full min-w-[240px] overflow-y-auto overscroll-contain rounded-xl p-1.5 outline-none"
          >
            {options.map((option, index) => {
              const isSelected = option.id === value;
              const isActive = index === activeIndex;

              return (
                <div
                  key={option.id}
                  id={`${listId}-${option.id}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(index)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isSelected
                      ? 'bg-slate-900 font-medium text-white dark:bg-white dark:text-[#090a0f]'
                      : isActive
                        ? 'bg-slate-900/[0.06] text-slate-950 dark:bg-white/[0.07] dark:text-white'
                        : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span
                      className={`font-mono-tabular text-[11px] ${
                        isSelected
                          ? 'text-white/70 dark:text-[#090a0f]/60'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {String(option.count).padStart(2, '0')}
                    </span>
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState<string>(ALL);

  const options: FilterOption[] = [
    { id: ALL, label: 'All categories', count: STACK_GROUPS.length },
    ...STACK_GROUPS.map((group) => ({
      id: group.id,
      label: group.category,
      count: group.tools.length,
    })),
  ];

  const visibleGroups =
    activeGroup === ALL
      ? STACK_GROUPS
      : STACK_GROUPS.filter((group) => group.id === activeGroup);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-[1140px] px-4 pt-6 pb-14 sm:px-6 sm:pt-8 sm:pb-20"
    >
      <div className="border-t border-slate-900/[0.08] pt-8 sm:pt-10 dark:border-white/[0.08]">
        {/* z-30 keeps the dropdown above the cards it opens over */}
        <Reveal className="relative z-30">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
                02 · Stack
              </p>
              <h2
                id="skills-heading"
                className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
              >
                Technologies & tools
              </h2>
              <p className="mt-2 max-w-[56ch] text-sm text-slate-600 sm:text-[15px] dark:text-slate-400">
                Tools I work with across interfaces, systems, and the spaces in
                between.
              </p>
            </div>

            <StackFilter
              options={options}
              value={activeGroup}
              onChange={setActiveGroup}
            />
          </div>
        </Reveal>

        {/* Clean Grouped Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {visibleGroups.map((group, idx) => (
            <Reveal key={group.id} delay={Math.min(idx * 0.04, 0.24)}>
              <div className="glass-panel-interactive flex h-full flex-col justify-between rounded-2xl p-5 sm:p-6">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                      {group.category}
                    </h3>
                    <span className="font-mono-tabular text-xs text-slate-400 dark:text-slate-500">
                      {String(group.tools.length).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {group.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-900/[0.07] pt-4 dark:border-white/[0.07]">
                  {group.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-900/[0.09] bg-slate-900/[0.03] px-3 py-1.5 text-xs font-medium text-slate-800 transition-colors hover:border-sky-600/35 hover:bg-slate-900/[0.06] hover:text-slate-950 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-sky-300/30 dark:hover:bg-white/[0.06] dark:hover:text-white"
                    >
                      <span>{tool.name}</span>
                      {tool.note && (
                        <span className="font-mono-tabular text-[10px] text-sky-700 dark:text-sky-300">
                          · {tool.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

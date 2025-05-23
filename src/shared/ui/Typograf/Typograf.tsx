import React from 'react';
import Typograf from 'typograf';

type SmartTextTag = 'p' | 'span' | 'div' | 'h1' | 'h2';

interface SmartTextProps {
  children: string | undefined | null ;
  className?: string;
  tag?: SmartTextTag;
}

const tp = new Typograf({ locale: ['ru'] });

tp.enableRule('common/nbsp/preposition'); // неразрывный пробел после предлогов
tp.enableRule('common/nbsp/conjunction'); // неразрывный пробел после союзов
tp.enableRule('ru/quote');                // «ёлочки» вместо кавычек
tp.enableRule('common/punctuation/quote'); // защита вложенных кавычек
tp.enableRule('common/space/delBeforePunctuation'); // удаление пробела перед знаками
tp.enableRule('ru/dash');                 // тире

const SmartText: React.FC<SmartTextProps> = ({ children, className, tag = 'p' }) => {
  if (!children) return null; // Если null или undefined — ничего не рендерим

  const formattedText = tp.execute(children);
  const Tag = tag;

  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: formattedText }} />
  );
};

export default SmartText;

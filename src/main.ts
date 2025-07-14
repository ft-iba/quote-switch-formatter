import './app.scss';
import './style.scss';

class FormatterApp {
  private keyQuote: 'double' | 'single' | 'none' = 'double';
  private valueQuote: 'double' | 'single' = 'double';
  private formatMode: 'pretty' | 'compact' | 'raw' = 'pretty';

  private input = document.getElementById('js-input') as HTMLTextAreaElement;
  private output = document.getElementById('js-output') as HTMLElement;
  private copyButton = document.getElementById('js-copyButton') as HTMLButtonElement;
  private toast = document.getElementById('js-toast') as HTMLDivElement;

  constructor() {
    this.initEventListeners();
    this.updateOutput();
  }

  private initEventListeners() {
  // keyQuote 初期アクティブ
  const keyQuoteButtons = document.querySelectorAll('[data-key-quote]');
  const defaultKeyQuote = keyQuoteButtons[0] as HTMLButtonElement;
  defaultKeyQuote.classList.add('active');
  this.keyQuote = defaultKeyQuote.dataset.keyQuote as typeof this.keyQuote;

  keyQuoteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      keyQuoteButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.keyQuote = (btn as HTMLButtonElement).dataset.keyQuote as typeof this.keyQuote;
      this.updateOutput();
    });
  });

  // valueQuote 初期アクティブ
  const valueQuoteButtons = document.querySelectorAll('[data-value-quote]');
  const defaultValueQuote = valueQuoteButtons[0] as HTMLButtonElement;
  defaultValueQuote.classList.add('active');
  this.valueQuote = defaultValueQuote.dataset.valueQuote as typeof this.valueQuote;

  valueQuoteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      valueQuoteButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.valueQuote = (btn as HTMLButtonElement).dataset.valueQuote as typeof this.valueQuote;
      this.updateOutput();
    });
  });

  // format 初期アクティブ
  const formatButtons = document.querySelectorAll('[data-format]');
  const defaultFormat = formatButtons[0] as HTMLButtonElement;
  defaultFormat.classList.add('active');
  this.formatMode = defaultFormat.dataset.format as typeof this.formatMode;

  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.formatMode = (btn as HTMLButtonElement).dataset.format as typeof this.formatMode;
      this.updateOutput();
    });
  });

  // input change
  this.input.addEventListener('input', () => this.updateOutput());

  // copy button
  this.copyButton.addEventListener('click', () => this.copyToClipboard());
}


  private updateOutput() {
    const raw = this.input.value;
    let base: unknown;

    try {
      base = eval(`(${raw})`);
    } catch (e) {
      this.output.textContent = '[Parse Error] Invalid input.';
      return;
    }

    let json: string;
    if (this.formatMode === 'pretty') {
      json = JSON.stringify(base, null, 2);
    } else if (this.formatMode === 'compact') {
      json = JSON.stringify(base);
    } else {
      json = raw;
    }

    const converted = this.convertQuotes(json);
    this.output.textContent = converted;
  }

  private convertQuotes(text: string): string {
    return text
      .replace(/([{\[,]\s*)(["'])([a-zA-Z0-9_]+)\2(?=\s*:)/g,
        (_, pre, _q, key) => {
          if (this.keyQuote === 'none') return pre + key;
          if (this.keyQuote === 'single') return pre + `'${key}'`;
          return pre + `"${key}"`;
        }
      )
      .replace(/:\s*(["'])(.*?)(?<!\\)\1/g,
        (_, _q, val) => {
          if (this.valueQuote === 'single') return `: '${val}'`;
          return `: "${val}"`;
        }
      );
  }

  private copyToClipboard() {
    const text = this.output.textContent ?? '';
    if (!text) return;

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(text)
        .then(() => this.showToast('Copied'))
        .catch(() => this.showToast('Copy failed'));
    } else {
      this.showToast('Clipboard is not supported by this browser');
    }
  }

  private showToast(message: string) {
    this.toast.textContent = message;
    this.toast.dataset.state = 'show';

    setTimeout(() => {
      this.toast.textContent = '';
      this.toast.dataset.state = '';
    }, 1000);
  }
}

// 初期化
new FormatterApp();
# Fonts

Typography ported from `RaoHai/knowledge-vault` at commit `121bc2d`.

- Huiwen Mincho: Public Domain, by Terry Wang. The source TTF is retained here so new articles can generate their own character subset. https://github.com/bosswnx/huiwenmincho-improved
- New Computer Modern: GUST Font License, except `NewCM10-Regular` which uses GPL3+ with Font and Distribution Exceptions. Latin, sans, and mono WOFF2 files in `public/assets/fonts/` are subsets copied from the vault's generated assets. License texts are included beside them. Upstream source and documentation: https://ctan.org/pkg/newcomputermodern

Most existing articles use simplified Chinese. Font subsetting reads the generated HTML, so traditional Chinese glyphs are included when an article uses them.

After changing article HTML, regenerate the Chinese font subset:

```sh
python -m pip install fonttools brotli
npm run fonts
```

Set `PYTHON` if the Python interpreter has a different command or path.

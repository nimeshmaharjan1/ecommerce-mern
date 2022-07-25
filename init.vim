set number
set autoindent
set tabstop=4
set shiftwidth=4
set smarttab
set softtabstop=4
set mouse=a
set omnifunc=javascriptcomplete#CompleteJS
" Plugins will be downloaded under the specified directory.
call plug#begin('~/AppData/Local/nvim/site/plugged')

" Declare the list of plugins.
Plug 'vim-airline/vim-airline'

" Markdown
Plug 'godlygeek/tabular'
Plug 'plasticboy/vim-markdown'

" Visual Settings
Plug 'junegunn/goyo.vim'
Plug 'junegunn/limelight.vim'
Plug 'reedes/vim-pencil'

" Color theme plugins
Plug 'joshdick/onedark.vim'
Plug 'morhetz/gruvbox'
Plug 'junegunn/seoul256.vim'
Plug 'jaredgorski/spacecamp'
Plug 'lifepillar/vim-solarized8'
Plug 'reedes/vim-colors-pencil'
Plug 'folke/tokyonight.nvim', {'branch': 'main'}

Plug 'jiangmiao/auto-pairs'
" Plug 'neoclide/coc-vetur'
Plug 'storyn26383/vim-vue'
Plug 'Yggdroot/indentLine'

" Nerdtree - A tree explorer plugin for vim.
Plug 'scrooloose/nerdtree'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
Plug 'Xuyuanp/nerdtree-git-plugin'
Plug 'jistr/vim-nerdtree-tabs'
Plug 'ryanoasis/vim-devicons'



Plug 'ctrlpvim/ctrlp.vim' " fuzzy find files

" =========================================================
"   Code Completion, IntelliSense and Syntax Highlighting
" =========================================================
" IntelliSense and Syntax Highlighting
" Conquer of Completion (CoC)
" Intellisense engine for Vim8 & Neovim, full language server protocol support as VSCode
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" ALE
" Check syntax in Vim asynchronously and fix files,
" with Language Server Protocol (LSP) support
Plug 'dense-analysis/ale'

Plug 'preservim/nerdcommenter'
" List ends here. Plugins become visible to Vim after this call.
call plug#end()

"""""""""""""""""""""""""""""""""""""""""""""""""
" Color Settings
"""""""""""""""""""""""""""""""""""""""""""""""""
syntax on

" onedark:
 let g:tokyonight_style = "night"
 let g:tokyonight_italic_functions = 1
 let g:tokyonight_sidebars = ["qf", "vista_kind", "terminal", "packer"]

 colorscheme tokyonight
" seoul256:
" seoul256 (dark), 236 is darkest
" let g:seoul256_background = 236
" colorscheme seoul256

" spacecamp:
" colorscheme spacecamp

" vim-solarized8:
" set background=dark
" colorscheme solarized8

" vim-colors-pencil:
" let g:pencil_higher_contrast_ui = 0
" colorscheme pencil
" set background=dark
filetype plugin on
"""""""""""""""""""""""""""""""""""""""""""""""""
" Visual Settings
"""""""""""""""""""""""""""""""""""""""""""""""""
" For Goyo
"let g:goyo_width=85

" For LimeLight
" Color name (:help cterm-colors) or ANSI code
let g:limelight_conceal_ctermfg = 'gray'
let g:limelight_conceal_ctermfg = 240
" Color name (:help gui-colors) or RGB color
let g:limelight_conceal_guifg = 'DarkGray'
let g:limelight_conceal_guifg = '#777777'
" if Limelight should highlight line rather than paragraph
let g:limelight_bop = '^.*$'
" let g:limelight_eop = '\n'
" let g:limelight_paragraph_span = 0
let mapleader = ","
"""""""""""""""""""""""""""""""""""""""""""""""""
" UI Settings
"""""""""""""""""""""""""""""""""""""""""""""""""
" Keep cursor in the middle of the page, useful for editing text
" set so=999
" Turn limelight on by default
" autocmd VimEnter * Limelight
" Turn Goyo on by default
" autocmd VimEnter * Goyo

"""""""""""""""""""""""""""""""""""""""""""""""""
" Markdown **, * etc settings
"""""""""""""""""""""""""""""""""""""""""""""""""
" set concealcursor=n
" set conceallevel=3
" hi Asterisks NONE
" hi AsteriskBold  cterm=bold gui=bold
" syn match Asterisks contained "**" conceal
 "syn match AsteriskBold "\\\@<!\*\*[^"*|]\+\*\*" contains=Asterisks
" autocmd VimEnter * highlight Normal ctermbg=black
" ctermfg=grey

"""""""""""""""""""""""""""""""""""""""""""""""""
" Other Settings
"""""""""""""""""""""""""""""""""""""""""""""""""
inoremap jk <ESC>
nmap <C-b> :NERDTreeToggle<CR>
nnoremap H gT
nnoremap L gt
let g:NERDTreeIgnore = ['^node_modules$']


" vim-prettier
"let g:prettier#quickfix_enabled = 0
"let g:prettier#quickfix_auto_focus = 0
" prettier command for coc
command! -nargs=0 Prettier :CocCommand prettier.formatFile
" run prettier on save
"let g:prettier#autoformat = 0
"autocmd BufWritePre *.js,*.jsx,*.mjs,*.ts,*.tsx,*.css,*.less,*.scss,*.json,*.graphql,*.md,*.vue,*.yaml,*.html PrettierAsync


" ctrlp
let g:ctrlp_user_command = ['.git/', 'git --git-dir=%s/.git ls-files -oc --exclude-standard']

" j/k will move virtual lines (lines that wrap)
noremap <silent> <expr> j (v:count == 0 ? 'gj' : 'j')
noremap <silent> <expr> k (v:count == 0 ? 'gk' : 'k')




" sync open file with NERDTree


" coc config
let g:coc_global_extensions = [
  \ 'coc-snippets',
  \ 'coc-pairs',
  \ 'coc-tsserver',
  \ 'coc-eslint', 
  \ 'coc-prettier', 
  \ 'coc-json', 
  \ 'coc-tailwindcss',
  \ 'coc-emmet',
  \ 'coc-css',
  \ 'coc-html'
  \ ]
  
" from readme
" if hidden is not set, TextEdit might fail.
set hidden " Some servers have issues with backup files, see #649 set nobackup set nowritebackup " Better display for messages set cmdheight=2 " You will have bad experience for diagnostic messages when it's default 4000.
set updatetime=300

" don't give |ins-completion-menu| messages.
set shortmess+=c

" always show signcolumns
set signcolumn=yes

" Use tab for trigger completion with characters ahead and navigate.
" Use command ':verbose imap <tab>' to make sure tab is not mapped by other plugin.
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use <c-space> to trigger completion.
inoremap <silent><expr> <c-space> coc#refresh()

" Use <cr> to confirm completion, `<C-g>u` means break undo chain at current position.
" Coc only does snippet and additional edit on confirm.
inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"
" Or use `complete_info` if your vim support it, like:
" inoremap <expr> <cr> complete_info()["selected"] != "-1" ? "\<C-y>" : "\<C-g>u\<CR>"

" Use `[g` and `]g` to navigate diagnostics
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" Remap keys for gotos
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Use K to show documentation in preview window
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

" Highlight symbol under cursor on CursorHold
autocmd CursorHold * silent call CocActionAsync('highlight')

" Remap for rename current word
nmap <F2> <Plug>(coc-rename)

" Remap for format selected region
xmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>f  <Plug>(coc-format-selected)

augroup mygroup
  autocmd!
  " Setup formatexpr specified filetype(s).
  autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
  " Update signature help on jump placeholder
  autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end

" Remap for do codeAction of selected region, ex: `<leader>aap` for current paragraph
xmap <leader>a  <Plug>(coc-codeaction-selected)
nmap <leader>a  <Plug>(coc-codeaction-selected)

" Remap for do codeAction of current line
nmap <leader>ac  <Plug>(coc-codeaction)
" Fix autofix problem of current line
nmap <leader>qf  <Plug>(coc-fix-current)

" Create mappings for function text object, requires document symbols feature of languageserver.
xmap if <Plug>(coc-funcobj-i)
xmap af <Plug>(coc-funcobj-a)
omap if <Plug>(coc-funcobj-i)
omap af <Plug>(coc-funcobj-a)

" Use <C-d> for select selections ranges, needs server support, like: coc-tsserver, coc-python
nmap <silent> <C-d> <Plug>(coc-range-select)
xmap <silent> <C-d> <Plug>(coc-range-select)

" Use `:Format` to format current buffer
command! -nargs=0 Format :call CocAction('format')

" Use `:Fold` to fold current buffer
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" use `:OR` for organize import of current buffer
command! -nargs=0 OR   :call     CocAction('runCommand', 'editor.action.organizeImport')

" Add status line support, for integration with other plugin, checkout `:h coc-status`
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

" Using CocList
" Show all diagnostics
nnoremap <silent> <space>a  :<C-u>CocList diagnostics<cr>
" Manage extensions
nnoremap <silent> <space>e  :<C-u>CocList extensions<cr>
" Show commands
nnoremap <silent> <space>c  :<C-u>CocList commands<cr>
" Find symbol of current document
nnoremap <silent> <space>o  :<C-u>CocList outline<cr>
" Search workspace symbols
nnoremap <silent> <space>s  :<C-u>CocList -I symbols<cr>
" Do default action for next item.
nnoremap <silent> <space>j  :<C-u>CocNext<CR>
" Do default action for previous item.
nnoremap <silent> <space>k  :<C-u>CocPrev<CR>
" Resume latest coc list
nnoremap <silent> <space>p  :<C-u>CocListResume<CR>

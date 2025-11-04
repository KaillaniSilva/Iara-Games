# Servidor HTTP local simples para Iara Games
# Execute este script no PowerShell para iniciar um servidor local

Write-Host "Iniciando servidor local na porta 8000..." -ForegroundColor Green
Write-Host "Acesse: http://localhost:8000" -ForegroundColor Yellow
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Gray
Write-Host ""

# Usa o servidor HTTP simples do Python (se disponível)
$python = Get-Command python -ErrorAction SilentlyContinue
if ($python) {
    python -m http.server 8000
} else {
    # Alternativa: usa o servidor HTTP do Node.js (se disponível)
    $node = Get-Command node -ErrorAction SilentlyContinue
    if ($node) {
        npx --yes http-server -p 8000 -o
    } else {
        Write-Host "Python ou Node.js não encontrado!" -ForegroundColor Red
        Write-Host "Instale Python ou Node.js, ou abra o index.html diretamente no navegador." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Alternativa: Abra o arquivo index.html diretamente no navegador." -ForegroundColor Cyan
        start index.html
    }
}


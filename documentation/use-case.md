# Buscar perfil público no Spotify

> ## Dados
* Username

> ## Fluxo primário
1. Obter dados (nome, url do perfil, e Spotify ID) da API do Spotify
2. Consultar se existe um usuário com o Spotify ID recebido acima
3. Criar uma conta para o usuário com os dados recebidos do Spotify
5. Retornar perfil criado

> ## Fluxo alternativo: Usuário já existe
3. Atualizar a conta do usuário com os dados recebidos do Spotify (Spotify ID, nome e url do perfil - só atualizar caso o nome recebido seja diferente do registrado na base)

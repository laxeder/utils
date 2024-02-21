#!/bin/bash

if [[ $EUID -ne 0 ]]; then
  echo "Voce precisar executar com privilégio root. Tente \"sudo ./rtl8188fu.sh\"" 2>&1
  exit 1
else
  echo "Executando instalação do driver de rede RTL8188FTV..."
fi

echo "Adicionando repositórios de drivers de rede \"ppa:kelebek333/kablosuz\"..."

# Adicionando repositório de drivers de rede
add-apt-repository ppa:kelebek333/kablosuz

echo "Atualizando pacotes..."

# Atualizando pacotes
apt-get update

echo "Instalando pacote \"rtl8188fu-dkms\"..."

# Instalando driver de rede RTL8188FTV (RTL8188FU)
apt install rtl8188fu-dkms -y

#####  Observações:
#####  O driver RTL8188EUS também pode funcionar
#####  Porem menos consistente em kernels mais antigos
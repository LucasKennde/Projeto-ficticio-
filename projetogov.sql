-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/05/2024 às 17:46
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projetogov`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `caduser`
--

CREATE TABLE `caduser` (
  `id_user` int(200) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `cpf` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT '1',
  `situacao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `caduser`
--

INSERT INTO `caduser` (`id_user`, `nome`, `cpf`, `email`, `senha`, `status`, `situacao`) VALUES
(67, 'Lucas kennde', '60892644311', 'lucaskennde@gmail.com', '$2a$10$MImwHixpe4wAhzkXIwPp4uxRx/nTTaUcJsezVjRrARE9ejfxsgNs.', 'admin', 'analise'),
(68, 'Ana Cristina Amorim do Nascimento', '06807722354', 'Anacristinaamorim20@gmail.com', '$2a$10$4Pa90GQHHkNRIBYKkfpcM.q9GFAOJ9Zo1wkD2ey317RVehkS.9p4u', '2', 'Rejeitado'),
(69, 'João Felipe ', '123456', 'Joao@gmail.com', '$2a$10$wRmT.i/1Uz540EVUJQ7A6O5cA0MqlIIR2vMsjWB.9v3eTbfgFGx8K', '2', 'Aprovado'),
(71, 'Usuário teste', '123456789', 'Teste@teste', '$2a$10$hr/trK/4C86IkP0atqspaOi/.KfIr7zEYSQubHHafxe30KeYtNrlm', '2', 'Aprovado'),
(72, 'Novo user', '654321', 'Teste@teste', '$2a$10$DxPn4Ygg8mPA6H6OlcaeLeBAecgViRYAiNMVHvrDQhDhXbxP.NmGu', '2', 'Analise'),
(73, 'Matheus Costa Gomes', '123', 'Matheus', '$2a$10$C37teK5NTNtWuqAg53x.KuhVib5x57MddA0Q/YDOFDXyF3q0UwnSO', '2', 'Rejeitado');

-- --------------------------------------------------------

--
-- Estrutura para tabela `economia`
--

CREATE TABLE `economia` (
  `id_economia` int(11) NOT NULL,
  `escolaridade` varchar(100) NOT NULL,
  `emprego` varchar(100) NOT NULL,
  `renda` varchar(100) NOT NULL,
  `beneficio` varchar(100) NOT NULL,
  `id_user` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `economia`
--

INSERT INTO `economia` (`id_economia`, `escolaridade`, `emprego`, `renda`, `beneficio`, `id_user`) VALUES
(7, 'superiorCompleto', '', 'maior5000', 'nao', '67'),
(8, 'fundamental', 'desempregado', 'entre500_1500', 'nao', '68'),
(9, 'medio', '', 'maior5000', 'nao', '69'),
(10, 'Nenhuma', '', 'R$ 1.500 - R$ 2.500', '', '71'),
(11, 'Ensino Médio', 'Desempregado', 'R$ 1.500 - R$ 2.500', 'nao', '72'),
(12, 'Ensino Superior Completo', 'Estudante', 'Mais de R$ 5.000', 'nao', '73');

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `id_endereco` int(11) NOT NULL,
  `rua` varchar(200) NOT NULL,
  `cep` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `telefone` varchar(100) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`id_endereco`, `rua`, `cep`, `cidade`, `estado`, `telefone`, `id_user`) VALUES
(14, 'Rua Edson Martins, 2901', '60540506', 'Fortaleza', 'Ceará', '85992624596', 67),
(15, 'Rua Edson Martins, 2901', '60540506', 'Fortaleza', 'Ceará', '85992624596', 68),
(16, 'Rua 9', '60540506', 'Fortaleza', 'Ceará', '85992624596', 69),
(17, 'Rua teste da Silva', '60540506', 'Fortaleza', 'Cesta', '85992624596', 71),
(18, 'Rua teste', '60540506', 'Fortaleza', 'Ceará', '859888999009', 72),
(19, 'Teste', '123', 'Fortal ', 'Ceará', '1234567', 73);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `caduser`
--
ALTER TABLE `caduser`
  ADD PRIMARY KEY (`id_user`);

--
-- Índices de tabela `economia`
--
ALTER TABLE `economia`
  ADD PRIMARY KEY (`id_economia`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD UNIQUE KEY `id_endereco` (`id_endereco`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `caduser`
--
ALTER TABLE `caduser`
  MODIFY `id_user` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de tabela `economia`
--
ALTER TABLE `economia`
  MODIFY `id_economia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `id_endereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

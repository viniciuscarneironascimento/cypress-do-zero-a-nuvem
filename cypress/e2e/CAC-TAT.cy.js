import { expect } from "chai";
import { fillMandatoryFieldsAndSubmit } from "../support/commands";

describe('Suite de Testes Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  context('Lição 1 e 2', () => {
    it('verifica o título da aplicação', () => {
      // o título é a descrição da aplicação que fica na aba do navegador
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
      //nome
      cy.get('#firstName').type('Vinicius');
      //sobrenome
      cy.get('#lastName').type('Nascimento');
      //email
      cy.get('#email').type('teste@teste.com', { log: false });
      //texto
      cy.get('#open-text-area')
        .type('Mensagem de teste bem grande para verificar o delay zero inserido Mensagem de teste bem grande para verificar o delay zero inserido Mensagem de teste bem grande para verificar o delay zero inserido Mensagem de teste bem grande para verificar o delay zero inserido Mensagem de teste bem grande para verificar o delay zero inserido Mensagem de teste bem grande para verificar o delay zero inserido Mensagem de teste bem grande para verificar o delay zero inserido Mensagem de teste bem grande para verificar o delay zero inserido '
          , { delay: 0 });
      //button enviar
      cy.get('button[class="button"]').contains('Enviar').click();
      //mensagem de sucesso
      cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      //email
      cy.get('#email').type('teste@teste.com1234');
      //button enviar
      cy.get('button[class="button"]').contains('Enviar').click();
      cy.get('.error').should('be.visible');
    });

    //Exercício 3
    it('Validar valor não-numérico no campo telefone', () => {
      cy.get('#phone')
        .type('teste')
        .then(($phone) => {
          expect($phone.val()).to.equal('');
          //Outra opção é transformar o objeto em algo entendível pelo cypress com o comando cy.wrap()
          cy.wrap($phone).should('have.value', '');
        });
    });

    //Exercício 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      //nome
      cy.get('#firstName').type('Vinicius');
      //sobrenome
      cy.get('#lastName').type('Nascimento');
      //email
      cy.get('#email').type('teste@teste.com');
      //texto
      cy.get('#open-text-area')
        .type('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário');
      //seleciona opção telefone no checkbox
      cy.get('#phone-checkbox').check();
      //button enviar
      cy.get('button[class="button"]').contains('Enviar').click();
      //mensagem de erro
      cy.get('.error').should('be.visible');
    });

    //Exercicio 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName').type('Vinicius').should('have.value', 'Vinicius');
      cy.get('#firstName').should('have.value', 'Vinicius');
      cy.get('#firstName').clear().should('have.value', '');
      //sobrenome
      cy.get('#lastName').type('Nascimento').should('have.value', 'Nascimento');
      cy.get('#lastName').should('have.value', 'Nascimento');
      cy.get('#lastName').clear().should('have.value', '');
      //email
      cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com');
      cy.get('#email').should('have.value', 'teste@teste.com');
      cy.get('#email').clear().should('have.value', '');
      //phone
      cy.get('#phone').type('71999999999').should('have.value', '71999999999');
      cy.get('#phone').should('have.value', '71999999999');
      cy.get('#phone').clear().should('have.value', '');
    });

    //Exercício 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      //button enviar
      cy.get('button[class="button"]').contains('Enviar').click();
      //mensagem de sucesso
      cy.get('.error').should('be.visible');
    });

    //Exercício 7
    it('envia o formuário com sucesso usando um comando customizado', () => {
      const data = {
        firstName: 'Vinicius',
        lastName: 'Nascimento',
        email: 'teste@teste.com',
        text: 'Mensagem de teste'
      }


      cy.fillMandatoryFieldsAndSubmit(data)
      cy.get('.success').should('be.visible');
    });

    //Exercício 8
    it('Usando CONTAINS para localizar botão', () => {

      cy.contains('Enviar').should('be.visible').click();
      cy.get('.error').should('be.visible');

      cy.contains('button', 'Enviar').should('be.visible').click();
      cy.get('.error').should('be.visible');

      cy.contains('.button', 'Enviar').should('be.visible').click();
      cy.get('.error').should('be.visible');

      cy.contains('[type="submit"]', 'Enviar').should('be.visible').click();
      cy.get('.error').should('be.visible');

      cy.contains('button[type="submit"]', 'Enviar').should('be.visible').click();
      cy.get('.error').should('be.visible');

      cy.contains('button[type="submit"][class="button"]', 'Enviar').should('be.visible').click();
      cy.get('.error').should('be.visible');
    });
  });

  context('Lição 3', () => {
    //Exercicio
    it('seleciona um produto (YouTube) por seu texto', () => {
      //seleção do elemento pelo Texto
      cy.get('#product')              // Seleciona o elemento <select> com o ID #product
        .select('YouTube')             // Seleciona a opção pelo texto visível
        .find('option:selected')      // Encontra a opção selecionada
        .should('have.text', 'YouTube');
    });

    //Exercicio 1
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      //seleção do elemento pelo Texto
      cy.get('#product')              // Seleciona o elemento <select> com o ID #product
        .select('Mentoria')             // Seleciona a opção pelo value
        .should('have.value', 'mentoria');
    });

    //Exercicio 2
    it('seleciona um produto (Blog) por seu índice', () => {
      //seleção do elemento pelo índice
      cy.get('#product')              // Seleciona o elemento <select> com o ID #product
        .select(1)             // Seleciona a opção pelo value
        .should('have.value', 'blog');
    });
  });

  context('Lição 4', () => {
    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback').check().should('be.checked');
      cy.get('input[type="radio"][value="ajuda').check().should('be.checked')
      cy.get('input[type="radio"][value="elogio').check().should('be.checked')
      cy.get('input[type="radio"][value="feedback').check().should('be.checked')
    });
    //Exercicio extra
    it('marca cada tipo de atendimento', () => {

      cy.get('input[type="radio"][name="atendimento-tat"]')
      .each((argumentoTiposAtendimento) => {
        cy.wrap(argumentoTiposAtendimento)
        .check()
        .should('be.checked')
      })      
    });
  });

  context('Lição 5', () => {
    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]').check().should('be.checked')
      .last().uncheck().should('not.be.checked');
    });
  });

  context('Lição 6', () => {
    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should('have.value', 'C:\\fakepath\\example.json') // Verificando o valor do input
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json');
        });
    });   
  });

  context('Teste com CI', () => {
    it('Testando commit sem yml', () => {
      //Simulando teste com erro
    });
  });






});

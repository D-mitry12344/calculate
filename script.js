define(['jquery'], function ($) {
  'use strict';

  return function () {
    var self = this;

    this.callbacks = {
      render: function () {
        let firstPole = JSON.parse(localStorage.firstVal).id;
        let secondPole = JSON.parse(localStorage.secondVal).id ;
        let thridPole = JSON.parse(localStorage.Result).id ;

        let firstFieldName = 'CFV'+'['+firstPole+']';
        let secondFieldName  = 'CFV'+'['+secondPole+']';
        let resultFieldName = 'CFV'+'['+thridPole+']';

        let firstInput = document.getElementsByName(firstFieldName)[0];
        let secondInput = document.getElementsByName(secondFieldName)[0]; 
        let resultPole = document.getElementsByName(resultFieldName)[0];

        let firstValue = firstInput.value; 
        let secondValue = secondInput.value;
        
        resultPole.value = Number(firstValue) + Number(secondValue);

        firstInput.oninput = function(){
          firstValue = firstInput.value; 
          resultPole.value = Number(firstValue) + Number(secondValue);
        };

        secondInput.oninput = function(){
          secondValue = secondInput.value;
          resultPole.value = Number(firstValue) + Number(secondValue);
        }  

        return true;
      },

      init: _.bind(function () {
        return true;
      },this),

      
      bind_actions: function () {
        return true;
      },

      loadPreloadedData: function () {
      },

      loadElements: function () {
      },

      linkCard: function () {
      },

      searchDataInCard: function () {
      },
    

      settings: function () {
        var $modal_body = $('.modal.' + self.get_settings().widget_code + ' .modal-body'),
            $widget_settings = $modal_body.find('.widget_settings_block__item_field');

        var poles = [];
        $.ajax({
          url: '/api/v4/leads/custom_fields',
          type: 'GET',
          contentType: "application/json; charset=utf-8",
        }).then(function(res) {
          self.poles = res._embedded.custom_fields;

          var selectors = [
           { name:"Первое слогаемое:", id:"firstSel"},                        
           { name:"Второе слогаемое:" , id:"secondSel"},               
           { name:"Результат", id:"thirdSel"}          
          ];

          var template = `
            {% for selector in selectors %}
              <div id="selectorDiv">
                <label>{{ selector.name }}</label>
                <br>
                <select id="{{ selector.id }}">
                  {% for item in poles %}
                    <option>
                      {{ item.name }} 
                    </option>
                  {% endfor %}
                </select>
              </div>
              <br>
            {% endfor %}
            <div>
              <label id="labelSaveError" style="display:none;">Значения не сохранены. Поля должны иметь уникальные значения.</label>
            </div>`;

          $widget_settings.html(self.render({data: template}, 
          {selectors, poles:self.poles}));            
          });

        return true;
      },
      onSave: function () {
        let firstId;
        let secondId;
        let resultId;

        for(let l= 0 ; l < self.poles.length ; l++){
          if(self.poles[l].name == $("#firstSel").val()){
            firstId= self.poles[l].id;
          };
          if(self.poles[l].name == $("#secondSel").val()){
            secondId= self.poles[l].id;
          };
          if(self.poles[l].name == $("#thirdSel").val()){
            resultId= self.poles[l].id;
          };
        };

        if(firstId === secondId || resultId ===  secondId || firstId ===  resultId){
          $( "#labelSaveError" ).css('color' , "rgb(255, 17, 17)");
          $( "#labelSaveError" ).css('display' , "block");
          return false;
        }else{
          $( "#labelSaveError" ).css('display' , "none");
          localStorage.firstVal =JSON.stringify({name:$("#firstSel").val() , id: firstId });
          localStorage.secondVal =JSON.stringify({name:$("#secondSel").val() , id: secondId});
          localStorage.Result =JSON.stringify({name:$("#thirdSel").val() ,  id: resultId});
        }; 
        
        return true;
      },
    };
  };
});
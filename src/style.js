export default (editor, opt = {}) => {

  if (opt.resetStyleManager) {
    let sectors = editor.StyleManager.getSectors();

    editor.on('load', () => {
      sectors.reset();
      sectors.add([{
          name: 'Dimension',
          open: false,
          buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
          properties:[{
            property: 'margin',
            properties:[
              { name: 'Top', property: 'margin-top'},
              { name: 'Right', property: 'margin-right'},
              { name: 'Bottom', property: 'margin-bottom'},
              { name: 'Left', property: 'margin-left'}
            ],
          },{
            property  : 'padding',
            detached: true,
            properties:[
              { name: 'Top', property: 'padding-top'},
              { name: 'Right', property: 'padding-right'},
              { name: 'Bottom', property: 'padding-bottom'},
              { name: 'Left', property: 'padding-left'}
            ],
          }],
        },{
          name: 'Typography',
          open: false,
          buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'line-height', 'color', 'text-align', 'align', 'vertical-align', 'text-decoration', 'text-transform'],
          properties:[
            { name: 'Font', property: 'font-family'},
            { name: 'Weight', property: 'font-weight'},
            { name:  'Font color', property: 'color'},
            { name:  'Line height', property: 'line-height'},
            {
              property: 'text-align',
              type: 'radio',
              defaults: 'left',
              list: [
                { value : 'left',  name : 'Left', title: 'Left', className: 'fa fa-align-left'},
                { value : 'center',  name : 'Center', title: 'Center', className: 'fa fa-align-center' },
                { value : 'right',   name : 'Right', title: 'Right', className: 'fa fa-align-right'},
                { value : 'justify', name : 'Justify', title: 'Justify', className: 'fa fa-align-justify'}
              ],
            },{
              property: 'align',
              type: 'radio',
              defaults: 'left',
              list: [
                { value : 'left',  name : 'Left', title: 'Left', className: 'fa fa-align-left'},
                { value : 'center',  name : 'Center', title: 'Center',className: 'fa fa-align-center' },
                { value : 'right',   name : 'Right', title: 'Right', className: 'fa fa-align-right'},
                { value : 'justify', name : 'Justify', title: 'Justify', className: 'fa fa-align-justify'}
              ],
            },{
              property: 'vertical-align',
              type: 'radio',
              defaults: 'middle',
              list: [
                { value : 'top',  name : 'Top', title: 'Top' },
                { value : 'middle',  name : 'Middle', title: 'Middle' },
                { value : 'bottom',   name : 'Bottom', title: 'Bottom' },
              ],
            },{
              property: 'text-decoration',
              type: 'radio',
              defaults: 'none',
              list: [
                { value: 'none', name: 'None', title: 'None', className: 'fa fa-times'},
                { value: 'underline', name: 'underline', title: 'Underline', className: 'fa fa-underline' },
                { value: 'line-through', name: 'Line-through', title: 'Line Through', className: 'fa fa-strikethrough'}
              ],
            },{
              property: 'text-transform',
              type: 'radio',
              defaults: 'none',
              list: [
                { value: 'none', name: 'None', title: 'None', className: 'fa fa-times'},
                { value: 'capitalize', name: 'Cap', title: 'Capitalize' },
                { value: 'uppercase', name: 'Upper', title: 'Uppercase' },
                { value: 'lowercase', name: 'Lower', title: 'Lowercase' },
              ],
            }],
        },{
          name: 'Decorations',
          open: false,
          buildProps: [ 'background-color', 'container-background-color', 'background-url', 'background-repeat',
            'background-size', 'border-radius', 'border'],
          properties: [{
            name: 'Container Background color',
            property: 'container-background-color',
            type: 'color',
          },{
            property: 'background-url',
            type: 'file',
          },{
            property: 'border-radius',
            properties  : [
              { name: 'Top Left', property: 'border-top-left-radius'},
              { name: 'Top Right', property: 'border-top-right-radius'},
              { name: 'Bottom Left', property: 'border-bottom-left-radius'},
              { name: 'Bottom Right', property: 'border-bottom-right-radius'}
            ],
          },{
            property: 'border-detached',
            name: 'Border',
            type: 'composite',
            properties: ['border-width'],
            detached: true,
            properties: [
              { name: 'Width', property: 'border-width', type:'integer'},
              { name: 'Style', property: 'border-style', type:'select',
              list:[
                  { value : 'none'},
                  { value : 'solid'},
                  { value : 'dotted'},
                  { value : 'dashed'},
                  { value : 'double'},
                  { value : 'groove'},
                  { value : 'ridge'},
                  { value : 'inset'},
                  { value : 'outset'}
                ]},
              { name: 'Color', property: 'border-color', type:'color'},
            ],
          }],
        },{
          name: 'Icons',
          open: false,
          properties: [{
            name: 'Facebook color',
            property: 'facebook-icon-color',
            type: 'color',
          },{
            name: 'Twitter color',
            property: 'twitter-icon-color',
            type: 'color',
          },{
            name: 'Google color',
            property: 'google-icon-color',
            type: 'color',
          },{
            name: 'Instagram color',
            property: 'instagram-icon-color',
            type: 'color',
          },{
            name: 'Linkedin color',
            property: 'linkedin-icon-color',
            type: 'color',
          },{
            name: 'Pinterest color',
            property: 'pinterest-icon-color',
            type: 'color',
          }],
        }
      ]);
    });
  }

}

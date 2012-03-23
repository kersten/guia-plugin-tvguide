var TVGuideEventView = Backbone.View.extend({
    template: 'TvGuideEventTemplate',
    tagName: 'div',
    className: 'event',

    events: {
        'click td.event': 'showEventDetails'
    },

    showEventDetails: function (ev) {
        "use strict";

        console.log('SHOW EVENT');

        //$(this.el).popover('hide');
        //$('#body').scrollTop();
        Backbone.history.navigate('!/Event/' + this.model.get('_id'), true);
    },

    render: function () {
        "use strict";

        var self = this,
            template,
            recordButton;

        template = _.template($('#' + this.template).html(), {event: this.model});
        $(this.el).html(template);

        recordButton = new ButtonRecordView({
            model: this.model
        });

        recordButton.render();
        $('.recordThis', this.el).append(recordButton.el);

        return this
    }
});
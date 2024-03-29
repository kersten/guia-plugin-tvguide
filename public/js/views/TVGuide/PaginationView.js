var TVGuidePaginationView = Backbone.View.extend({
    template: 'TvGuidePaginationTemplate',

    events: {
        'click li:not(.active)': 'switchDate'
    },

    initialize: function () {
        "use strict";

        this.date = new XDate();

        if (parseInt(this.date.toString('HH')) >= 0 && parseInt(this.date.toString('HH')) < 5) {
            this.date.addDays(-1);
        }
    },

    switchDate: function (ev) {
        "use strict";

        $('li.active', this.el).removeClass('active');
        $(ev.currentTarget).addClass('active');

        Backbone.history.navigate('!/TvGuide/' + $(ev.currentTarget).data('date') + '/' + $(ev.currentTarget).data('page'), true);
    },

    render: function () {
        "use strict";

        var template = _.template($('#' + this.template).html(), {active: this.options.date, page: this.options.page, d: this.date});
        $(this.el).html(template);

        return this;
    }
});
var TVGuideChannelView = Backbone.View.extend({
    url: "tvguide/channel",
    template: 'TvGuideChannelTemplate',
    tagName: 'div',

    showEventPopover: function (ev) {
        "use strict";

        var popover;

        if (!$(ev.currentTarget).hasClass('isPrime')) {
            if (ev.type == 'mouseenter') {
                $(ev.currentTarget).popover('show');
                $(ev.currentTarget).css({textDecoration: 'underline'});
            } else {
                popover = ev.currentTarget;

                this.popoverEl = popover;
                this.popoverId = setTimeout(function () {
                    $(popover).popover('hide');
                }, 100);

                $(ev.currentTarget).css({textDecoration: 'none'});
            }
        }
    },

    render: function () {
        "use strict";

        var template = _.template($('#' + this.template).html(), {channel: this.model});
        return template;
    }
});
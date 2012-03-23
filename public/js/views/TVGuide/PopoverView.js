var TVGuidePopoverView = Backbone.View.extend({
    template: 'TvGuidePopoverTemplate',

    events: {
        'hover .popover': 'handlePopover',
        'hover img.record': 'switchRecordImage',
        'click img.record': 'recordEvent'
    },

    initialize: function () {
        "use strict";

        var self = this,
            recordView,
            template;
        
        recordView = new EventRecordButtonView({
            model: this.model
        });

        template = _.template($('#' + this.template).html(), {event: this.model});
        
        $(this.el).popover({
            title: function () {
                return self.model.get('title');
            },
            content: function () {
                $('.eventInfos', template).prepend(recordView.render().el);
                return recordView.render().el;
            },
            trigger: 'manual',
            placement: 'right',
            html: true,
            el: this.el,
            popoverEl: this.options.popoverEl
        });
    },

    handlePopover: function (ev) {
        "use strict";

        if (ev.type == 'mouseenter') {
            clearTimeout(this.timerId);
        } else {
            this.hide();
        }
    },

    switchRecordImage: function (ev) {
        "use strict";

        var image = '',
            image_record = '-2';

        if (this.model.get('timer_active')) {
            image = '-2';
            image_record = '';
        }

        switch (ev.type) {
            case 'mouseenter':
                $(ev.currentTarget).attr('src', '/icons/devine/black/16x16/Circle' + image_record + '.png');
                break;

            case 'mouseleave':
                $(ev.currentTarget).attr('src', '/icons/devine/black/16x16/Circle' + image + '.png');
                break;
        };
    },

    recordEvent: function () {
        "use strict";
    },

    show: function () {
        "use strict";

        $(this.el).popover('show');
    },

    hide: function () {
        "use strict";

        var _this = this,
            transitionEnd;

        this.timerId = setTimeout(function () {
            if ($.support.transition) {
                transitionEnd = "TransitionEnd";

                if ($.browser.webkit) {
                    transitionEnd = "webkitTransitionEnd";
                } else if ($.browser.mozilla) {
                    transitionEnd = "transitionend";
                } else if ($.browser.opera) {
                    transitionEnd = "oTransitionEnd";
                }
            }

            $(_this.el).bind(transitionEnd, function () {
                _this.options.callback.call();
            });

            $(_this.el).popover('hide');
        }, 100);
    },

    render: function () {
        "use strict";

        return this;
    }
});
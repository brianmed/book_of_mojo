package Photo;

use Mojo::Base 'Mojolicious';

use FindBin;

sub startup {
    my $self = shift;

    $self->log->level("debug");

    # 10 MB size limit
    $ENV{MOJO_MAX_MESSAGE_SIZE} = 10485760;

    my $r = $self->routes;

    $self->plugin(AccessLog => {log => "$FindBin::Bin/../log/access.log", format => '%h %l %u %t "%r" %>s %b %D "%{Referer}i" "%{User-Agent}i"'});

    $r->get('/')->to(controller => 'Index', action => 'slash');
}

1;
